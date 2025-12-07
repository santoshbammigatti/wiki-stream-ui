
import React from 'react';
import {
  Box, TextField, MenuItem, FormControlLabel, Switch, Stack, Tooltip, Button
} from '@mui/material';

export type Filters = {
  wiki: string;        // e.g., "enwiki"
  type: string;        // "edit" | "new" | "log" | "" (any)
  namespace: number | null; // 0 for main, null for any
  bot: 'any' | 'true' | 'false';
  minDelta: number;    // min byte delta for edits
};

type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
  onApply: () => void;
};

export default function Filters({ filters, onChange, onApply }: Props) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Wiki"
        select
        value={filters.wiki}
        onChange={(e) => onChange({ ...filters, wiki: e.target.value })}
        sx={{ minWidth: 160 }}
      >
        {['enwiki', 'viwiki', 'dewiki', 'frwiki', 'eswiki'].map(w => (
          <MenuItem key={w} value={w}>{w}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Type"
        select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="">Any</MenuItem>
        <MenuItem value="edit">edit</MenuItem>
        <MenuItem value="new">new</MenuItem>
        <MenuItem value="log">log</MenuItem>
      </TextField>

      <TextField
        label="Namespace"
        select
        value={filters.namespace ?? ''}
        onChange={(e) => {
          const v = e.target.value === '' ? null : Number(e.target.value);
          onChange({ ...filters, namespace: v });
        }}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">Any</MenuItem>
        <MenuItem value={0}>0 (Main)</MenuItem>
        <MenuItem value={1}>1 (Talk)</MenuItem>
        <MenuItem value={2}>2 (User)</MenuItem>
        <MenuItem value={4}>4 (Project)</MenuItem>
      </TextField>

      <TextField
        label="Bot"
        select
        value={filters.bot}
        onChange={(e) => onChange({ ...filters, bot: e.target.value as Filters['bot'] })}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="any">Any</MenuItem>
        <MenuItem value="false">Human only</MenuItem>
        <MenuItem value="true">Bot only</MenuItem>
      </TextField>

      <Tooltip title="Minimum byte change for edits">
        <TextField
          label="Min Δ bytes"
          type="number"
          value={filters.minDelta}
          onChange={(e) => onChange({ ...filters, minDelta: Number(e.target.value || 0) })}
          sx={{ minWidth: 150 }}
        />
      </Tooltip>

      <Button variant="contained" onClick={onApply}>Apply & Connect</Button>
    </Stack>
  );
}
