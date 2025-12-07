import { Chip, Tooltip } from '@mui/material';

const NAMESPACE_INFO: Record<number, { label: string; color: string; description: string }> = {
  0: { label: 'Article', color: '#1976d2', description: 'Main encyclopedia articles' },
  1: { label: 'Talk', color: '#9c27b0', description: 'Article discussion pages' },
  2: { label: 'User', color: '#2e7d32', description: 'User profile pages' },
  3: { label: 'User Talk', color: '#388e3c', description: 'User discussion pages' },
  4: { label: 'Project', color: '#ed6c02', description: 'Wikipedia project pages' },
  5: { label: 'Project Talk', color: '#f57c00', description: 'Project discussion pages' },
  6: { label: 'File', color: '#0288d1', description: 'Media and image pages' },
  7: { label: 'File Talk', color: '#039be5', description: 'Media discussion pages' },
  10: { label: 'Template', color: '#7b1fa2', description: 'Template pages' },
  11: { label: 'Template Talk', color: '#8e24aa', description: 'Template discussion pages' },
  14: { label: 'Category', color: '#c62828', description: 'Category pages' },
  15: { label: 'Category Talk', color: '#d32f2f', description: 'Category discussion pages' },
};

type Props = {
  namespace?: number;
};

export default function NamespaceBadge({ namespace }: Props) {
  if (typeof namespace !== 'number') {
    return (
      <Chip label="—" size="small" variant="outlined" sx={{ minWidth: 70 }} />
    );
  }

  const info = NAMESPACE_INFO[namespace] || { 
    label: `NS:${namespace}`, 
    color: '#757575',
    description: `Namespace ${namespace}`
  };

  return (
    <Tooltip title={`${info.description} (NS:${namespace})`} arrow>
      <Chip
        label={info.label}
        size="small"
        sx={{
          bgcolor: info.color,
          color: 'white',
          fontWeight: 600,
          minWidth: 80,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            opacity: 0.85,
            transform: 'scale(1.05)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          },
        }}
      />
    </Tooltip>
  );
}
