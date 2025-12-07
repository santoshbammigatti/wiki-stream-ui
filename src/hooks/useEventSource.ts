
import { useCallback, useEffect, useRef, useState } from 'react';
import type { RecentChangeEvent } from '../types';

/**
 * Hook to consume an SSE endpoint and keep an ephemeral buffer.
 * - Auto-purges events older than `purgeSeconds`
 * - Provides connect/disconnect controls and status
 */
export function useEventSource(
  url: string | null,
  purgeSeconds = 10,
  maxItems = 200
) {
  const esRef = useRef<EventSource | null>(null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'open' | 'error' | 'closed'>('idle');
  const [events, setEvents] = useState<RecentChangeEvent[]>([]);

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
        setEvents(prev => {
          const next = [e, ...prev].slice(0, maxItems);
          return next;
        });
      } catch {
        // ignore parse errors
      }
    };
  }, [url, maxItems]);

  const disconnect = useCallback(() => {
    esRef.current?.close();
    esRef.current = null;
    setStatus('closed');
  }, []);

  // Auto-purge every purgeSeconds
  useEffect(() => {
    const id = setInterval(() => {
      const cutoff = Math.floor(Date.now() / 1000) - purgeSeconds;
      setEvents(prev => prev.filter(e => (e.timestamp ?? 0) >= cutoff));
    }, purgeSeconds * 1000);
    return () => clearInterval(id);
  }, [purgeSeconds]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      esRef.current?.close();
      esRef.current = null;
    };
  }, []);

  return { status, events, connect, disconnect, setEvents };
}