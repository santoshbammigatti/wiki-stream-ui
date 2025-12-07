import {
  TextField, MenuItem, Stack
} from '@mui/material';

export type Filters = {
  wiki: string;        // e.g., "enwiki"
  type: string;        // "edit" | "new" | "log" | "" (any)
  namespace: number | null; // 0 for main, null for any
  bot: 'any' | 'true' | 'false';
  minDelta: number;    // min byte delta for edits
  purgeSeconds: number; // how long to keep events (0 = never purge)
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

const purgeOptions = [
  { value: 0, label: '♾️ Never' },
  { value: 30, label: '30 seconds' },
  { value: 60, label: '1 minute' },
  { value: 120, label: '2 minutes' },
  { value: 300, label: '5 minutes' },
  { value: 600, label: '10 minutes' },
];

export default function Filters({ filters, onChange }: Props) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 0 }}>
      <TextField
        id="wiki-filter"
        label="Wiki Language"
        select
        value={filters.wiki}
        onChange={(e) => onChange({ ...filters, wiki: e.target.value })}
        sx={{ 
          flex: 1, 
          minWidth: 160,
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }
        }}
        size="medium"
        helperText="Select Wikipedia edition"
      >
        {Object.entries(wikiLabels).map(([code, label]) => (
          <MenuItem key={code} value={code}>{label}</MenuItem>
        ))}
      </TextField>

      <TextField
        id="type-filter"
        label="Event Type"
        select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
        sx={{ flex: 1, minWidth: 140 }}
        size="medium"
        helperText="Filter by change type"
      >
        <MenuItem value="">✨ Any</MenuItem>
        <MenuItem value="edit">✏️ Edit</MenuItem>
        <MenuItem value="new">📄 New Page</MenuItem>
        <MenuItem value="log">📋 Log</MenuItem>
      </TextField>

      <TextField
        id="namespace-filter"
        label="Namespace"
        select
        value={filters.namespace ?? ''}
        onChange={(e) => {
          const v = e.target.value === '' ? null : Number(e.target.value);
          onChange({ ...filters, namespace: v });
        }}
        sx={{ flex: 1, minWidth: 160 }}
        size="medium"
        helperText="Page category filter"
      >
        <MenuItem value="">All Namespaces</MenuItem>
        <MenuItem value={0}>0 - Main Articles</MenuItem>
        <MenuItem value={1}>1 - Talk</MenuItem>
        <MenuItem value={2}>2 - User</MenuItem>
        <MenuItem value={4}>4 - Project</MenuItem>
      </TextField>

      <TextField
        id="bot-filter"
        label="Bot Filter"
        select
        value={filters.bot}
        onChange={(e) => onChange({ ...filters, bot: e.target.value as Filters['bot'] })}
        sx={{ flex: 1, minWidth: 140 }}
        size="medium"
        helperText="Human or bot edits"
      >
        <MenuItem value="any">🤖 Any</MenuItem>
        <MenuItem value="false">👤 Humans Only</MenuItem>
        <MenuItem value="true">🤖 Bots Only</MenuItem>
      </TextField>

      <TextField
        id="min-delta-filter"
        label="Min Δ Bytes"
        type="number"
        value={filters.minDelta}
        onChange={(e) => onChange({ ...filters, minDelta: Number(e.target.value || 0) })}
        sx={{ flex: 1, minWidth: 150 }}
        size="medium"
        inputProps={{ min: 0, step: 10 }}
        helperText="Min byte change for edits"
      />

      <TextField
        id="purge-time-filter"
        label="⏳ Auto-Purge"
        select
        value={filters.purgeSeconds}
        onChange={(e) => onChange({ ...filters, purgeSeconds: Number(e.target.value) })}
        sx={{ flex: 1, minWidth: 160 }}
        size="medium"
        helperText="Event retention time"
      >
        {purgeOptions.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
