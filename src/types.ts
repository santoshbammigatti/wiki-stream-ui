
export type RecentChangeType = 'edit' | 'new' | 'log';

export interface LengthInfo {
  old?: number;
  new?: number;
}

export interface RecentChangeEvent {
  wiki?: string;            // e.g., "enwiki"
  type?: RecentChangeType;  // "edit" | "new" | "log"
  namespace?: number;       // 0 for main/article
  title?: string;
  user?: string;
  bot?: boolean;
  timestamp?: number;       // unix seconds
  comment?: string;
  length?: LengthInfo;      // only present for edits
  log_type?: string;        // only for type="log"
  log_action?: string;      // only for type="log"
}
