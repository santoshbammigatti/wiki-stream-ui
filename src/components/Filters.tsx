import {
  TextField, MenuItem, Stack, Tooltip
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
};

const wikiLabels: Record<string, string> = {
  enwiki: '🇬🇧 English',
  viwiki: '🇻🇳 Vietnamese',
  dewiki: '🇩🇪 German',
  frwiki: '🇫🇷 French',
  eswiki: '🇪🇸 Spanish',
};

export default function Filters({ filters, onChange }: Props) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 0 }}>
      <TextField
        label="Wiki Language"
        select
        value={filters.wiki}
        onChange={(e) => onChange({ ...filters, wiki: e.target.value })}
        sx={{ flex: 1, minWidth: 160 }}
        size="medium"
      >
        {Object.entries(wikiLabels).map(([code, label]) => (
          <MenuItem key={code} value={code}>{label}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Event Type"
        select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
        sx={{ flex: 1, minWidth: 140 }}
        size="medium"
      >
        <MenuItem value="">✨ Any</MenuItem>
        <MenuItem value="edit">✏️ Edit</MenuItem>
        <MenuItem value="new">📄 New Page</MenuItem>
        <MenuItem value="log">📋 Log</MenuItem>
      </TextField>

      <TextField
        label="Namespace"
        select
        value={filters.namespace ?? ''}
        onChange={(e) => {
          const v = e.target.value === '' ? null : Number(e.target.value);
          onChange({ ...filters, namespace: v });
        }}
        sx={{ flex: 1, minWidth: 160 }}
        size="medium"
      >
        <MenuItem value="">All Namespaces</MenuItem>
        <MenuItem value={0}>0 - Main Articles</MenuItem>
        <MenuItem value={1}>1 - Talk</MenuItem>
        <MenuItem value={2}>2 - User</MenuItem>
        <MenuItem value={4}>4 - Project</MenuItem>
      </TextField>

      <TextField
        label="Bot Filter"
        select
        value={filters.bot}
        onChange={(e) => onChange({ ...filters, bot: e.target.value as Filters['bot'] })}
        sx={{ flex: 1, minWidth: 140 }}
        size="medium"
      >
        <MenuItem value="any">🤖 Any</MenuItem>
        <MenuItem value="false">👤 Humans Only</MenuItem>
        <MenuItem value="true">🤖 Bots Only</MenuItem>
      </TextField>

      <Tooltip title="Minimum byte change for edit events (filters out small changes)">
        <TextField
          label="Min Δ Bytes"
          type="number"
          value={filters.minDelta}
          onChange={(e) => onChange({ ...filters, minDelta: Number(e.target.value || 0) })}
          sx={{ flex: 1, minWidth: 150 }}
          size="medium"
          inputProps={{ min: 0, step: 10 }}
        />
      </Tooltip>
    </Stack>
  );
}
