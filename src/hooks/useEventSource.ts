
import { useCallback, useEffect, useRef, useState } from 'react';
import type { RecentChangeEvent } from '../types';

/**
 * Hook to consume an SSE endpoint and keep an ephemeral buffer.
 * - Auto-purges events older than `purgeSeconds`
 * - Provides connect/disconnect controls and status
 * - Supports pause/resume functionality
 */
export function useEventSource(
  url: string | null,
  purgeSeconds = 60,  // Increased to 60 seconds for production
  maxItems = 500      // Increased capacity
) {
  const esRef = useRef<EventSource | null>(null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'open' | 'error' | 'closed'>('idle');
  const [events, setEvents] = useState<RecentChangeEvent[]>([]);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false); // Use ref to avoid stale closure
  const [totalReceived, setTotalReceived] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const pendingEventsRef = useRef<RecentChangeEvent[]>([]);

  const connect = useCallback(() => {
    if (!url) return;
    // Close existing connection, if any
    esRef.current?.close();
    setStatus('connecting');

    const es = new EventSource(url);
    esRef.current = es;

    es.onopen = () => setStatus('open');
    es.onerror = () => setStatus('error');

    es.onmessage = (evt) => {
      try {
        const e: RecentChangeEvent = JSON.parse(evt.data);
        setTotalReceived(prev => prev + 1);
        
        // Use ref to get current pause state (avoids stale closure)
        if (pausedRef.current) {
          // Store in buffer when paused
          pendingEventsRef.current = [e, ...pendingEventsRef.current];
          setPendingCount(pendingEventsRef.current.length);
        } else {
          setEvents(prev => {
            const next = [e, ...prev].slice(0, maxItems);
            return next;
          });
        }
      } catch {
        // ignore parse errors
      }
    };
  }, [url, maxItems]); // Remove paused from deps

  const disconnect = useCallback(() => {
    esRef.current?.close();
    esRef.current = null;
    setStatus('closed');
    setPaused(false);
    pausedRef.current = false;
    pendingEventsRef.current = [];
    setPendingCount(0);
  }, []);

  const togglePause = useCallback(() => {
    setPaused(prev => {
      const newPaused = !prev;
      pausedRef.current = newPaused; // Update ref
      
      if (!newPaused && pendingEventsRef.current.length > 0) {
        // Resume: merge pending events
        setEvents(current => {
          const merged = [...pendingEventsRef.current, ...current].slice(0, maxItems);
          pendingEventsRef.current = [];
          setPendingCount(0);
          return merged;
        });
      }
      return newPaused;
    });
  }, [maxItems]);

  const clearEvents = useCallback(() => {
    setEvents([]);
    pendingEventsRef.current = [];
    setPendingCount(0);
    setTotalReceived(0);
  }, []);

  // Auto-purge old events (only if enabled)
  useEffect(() => {
    if (purgeSeconds <= 0) return; // Disable purging if 0 or negative
    
    // Check every second for accurate purging
    const id = setInterval(() => {
      const cutoff = Math.floor(Date.now() / 1000) - purgeSeconds;
      
      setEvents(prev => {
        const filtered = prev.filter(e => {
          const eventTime = e.timestamp ?? 0;
          return eventTime >= cutoff;
        });
        
        // Only update if something was actually purged
        if (filtered.length !== prev.length) {
          console.log(`Purged ${prev.length - filtered.length} events (older than ${purgeSeconds}s)`);
        }
        return filtered;
      });
      
      // Also purge pending events
      const beforeCount = pendingEventsRef.current.length;
      pendingEventsRef.current = pendingEventsRef.current.filter(
        e => (e.timestamp ?? 0) >= cutoff
      );
      if (beforeCount !== pendingEventsRef.current.length) {
        setPendingCount(pendingEventsRef.current.length);
      }
    }, 1000); // Check every second for accuracy
    
    return () => clearInterval(id);
  }, [purgeSeconds]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      esRef.current?.close();
      esRef.current = null;
    };
  }, []);

  return { 
    status, 
    events, 
    connect, 
    disconnect, 
    togglePause,
    clearEvents,
    paused,
    totalReceived,
    pendingCount,
  };
}