
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

export default function EventTable({ events }: Props) {
  return (
    <Paper elevation={1} sx={{ overflow: 'hidden', borderRadius: 3 }}>
      <TableContainer>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Wiki</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>NS</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Bot</TableCell>
              <TableCell align="right">Δ bytes</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((e, idx) => (
              <TableRow key={idx}>
                <TableCell>{e.timestamp ? dayjs(e.timestamp * 1000).format('HH:mm:ss') : ''}</TableCell>
                <TableCell>{e.wiki}</TableCell>
                <TableCell>{e.type}</TableCell>
                <TableCell>{typeof e.namespace === 'number' ? e.namespace : ''}</TableCell>
                <TableCell>
                  <Tooltip title={e.title || ''}>
                    <Typography noWrap maxWidth={260}>{e.title}</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={e.user || ''}>
                    <Typography noWrap maxWidth={180}>{e.user}</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip
                    label={e.bot ? 'Bot' : 'Human'}
                    color={e.bot ? 'secondary' : 'primary'}
                    size="small"
                    variant={e.bot ? 'outlined' : 'filled'}
                  />
                </TableCell>
                <TableCell align="right">{deltaText(e.length)}</TableCell>
                <TableCell>
                  <Tooltip title={e.comment || ''}>
                    <Typography noWrap maxWidth={300}>{e.comment}</Typography>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
