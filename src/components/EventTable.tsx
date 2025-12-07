import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Tooltip, Typography
} from '@mui/material';
import dayjs from 'dayjs';
import type { RecentChangeEvent } from '../types';
import NamespaceBadge from './NamespaceBadge';

// Add keyframe animation for new rows
const slideInAnimation = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// Inject the animation into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = slideInAnimation;
  document.head.appendChild(styleSheet);
}

type Props = {
  events: RecentChangeEvent[];
};

function deltaText(length?: { old?: number; new?: number }) {
  if (!length || typeof length.new !== 'number' || typeof length.old !== 'number') return '';
  const d = (length.new as number) - (length.old as number);
  const sign = d > 0 ? '+' : '';
  return `${sign}${d}`;
}

function getDeltaColor(delta: number): string {
  if (delta > 1000) return '#2e7d32';  // Green for large additions
  if (delta > 100) return '#66bb6a';   // Light green for medium additions
  if (delta > 0) return '#81c784';     // Very light green for small additions
  if (delta < -1000) return '#c62828'; // Red for large deletions
  if (delta < -100) return '#ef5350';  // Light red for medium deletions
  if (delta < 0) return '#e57373';     // Very light red for small deletions
  return '#757575';                     // Gray for no change
}

export default function EventTable({ events }: Props) {
  const [currentTime, setCurrentTime] = useState(() => Math.floor(Date.now() / 1000));

  // Update current time every second for age calculations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (events.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 8, 
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-out'
        }}
      >
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          📡 No events yet. Click "Connect" to begin streaming.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>⏰ Time</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>🌐 Wiki</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>📝 Type</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>NS</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>📄 Title</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>👤 User</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>🤖 Bot</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>📊 Δ bytes</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>💬 Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((e, idx) => {
            const delta = e.length ? (e.length.new ?? 0) - (e.length.old ?? 0) : 0;
            const deltaStr = deltaText(e.length);
            const ageSeconds = e.timestamp ? currentTime - e.timestamp : 0;
            const opacity = e.timestamp ? Math.max(0.4, 1 - (ageSeconds / 120)) : 1;
            
            return (
              <TableRow 
                key={idx}
                sx={{
                  '&:hover': { 
                    bgcolor: 'action.hover',
                    transform: 'scale(1.01)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: opacity,
                  animation: idx < 5 ? `slideInRight 0.4s ease-out ${idx * 0.05}s both` : 'none'
                }}
              >
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  <Tooltip 
                    title={e.timestamp 
                      ? `${ageSeconds}s ago • ${ageSeconds < 10 ? '🟢 Fresh' : ageSeconds < 30 ? '🟡 Recent' : '🟠 Old'}`
                      : 'Unknown'
                    } 
                    arrow
                  >
                    <Typography component="span" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {e.timestamp ? dayjs(e.timestamp * 1000).format('HH:mm:ss') : ''}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={e.wiki} 
                    size="small" 
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={e.type}
                    size="small"
                    color={e.type === 'edit' ? 'primary' : e.type === 'new' ? 'success' : 'default'}
                    variant="filled"
                  />
                </TableCell>
                <TableCell>
                  <NamespaceBadge namespace={e.namespace} />
                </TableCell>
                <TableCell>
                  <Tooltip title={e.title || ''} arrow>
                    <Typography noWrap maxWidth={260} sx={{ fontWeight: 500 }}>
                      {e.title}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={e.user || ''} arrow>
                    <Typography noWrap maxWidth={180} sx={{ color: 'text.secondary' }}>
                      {e.user}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip
                    label={e.bot ? '🤖 Bot' : '👤 Human'}
                    color={e.bot ? 'secondary' : 'primary'}
                    size="small"
                    variant={e.bot ? 'outlined' : 'filled'}
                    sx={{ minWidth: 85 }}
                  />
                </TableCell>
                <TableCell align="right">
                  {deltaStr && (
                    <Chip
                      label={deltaStr}
                      size="small"
                      sx={{
                        bgcolor: getDeltaColor(delta),
                        color: 'white',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        minWidth: 70,
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title={e.comment || ''} arrow>
                    <Typography 
                      noWrap 
                      maxWidth={300} 
                      sx={{ 
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        fontStyle: e.comment ? 'normal' : 'italic'
                      }}
                    >
                      {e.comment || '(no comment)'}
                    </Typography>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
