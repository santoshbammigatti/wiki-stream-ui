
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Tooltip, Typography
} from '@mui/material';
import dayjs from 'dayjs';
import type { RecentChangeEvent } from '../types';

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
  if (events.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No events yet. Click "Start Stream" to begin.
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
            
            return (
              <TableRow 
                key={idx}
                sx={{
                  '&:hover': { bgcolor: 'action.hover' },
                  transition: 'background-color 0.2s',
                }}
              >
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {e.timestamp ? dayjs(e.timestamp * 1000).format('HH:mm:ss') : ''}
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
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {typeof e.namespace === 'number' ? e.namespace : ''}
                  </Typography>
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
