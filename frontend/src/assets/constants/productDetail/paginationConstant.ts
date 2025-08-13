export const DEFAULT_PAGE_SIZE = 8 as const;
export const MAX_PAGE_BUTTONS = 5 as const; // shows up to 5 numbered buttons

export const LABELS = {
  previous: 'Previous',
  next: 'Next',
  page: (n: number) => `Page ${n}`,
} as const;

export type PaginationConfig = {
  pageSize: number;
  maxButtons: number;
};

export const DEFAULT_PAGINATION_CONFIG: PaginationConfig = {
  pageSize: DEFAULT_PAGE_SIZE,
  maxButtons: MAX_PAGE_BUTTONS,
};

