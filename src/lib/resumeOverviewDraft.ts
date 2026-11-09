import CONTENT_MAIN, { DEVELOPER_OVERVIEW } from '@/constants/description';

export type TOverviewItem = {
  readonly content: string;
  readonly bold: string;
  readonly link?: string;
};

export type TOverviewDraft = {
  readonly title: string;
  readonly summary: string;
  readonly items: readonly TOverviewItem[];
};

const STORAGE_KEY = 'resume.overviewDraft';

export const getDefaultOverviewDraft = (): TOverviewDraft => ({
  title: DEVELOPER_OVERVIEW.title,
  summary: DEVELOPER_OVERVIEW.summary,
  items: CONTENT_MAIN.map(item => ({
    content: item.content,
    bold: item.bold,
  })),
});

const isOverviewItem = (value: unknown): value is TOverviewItem => {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.content === 'string' && typeof item.bold === 'string';
};

const isOverviewDraft = (value: unknown): value is TOverviewDraft => {
  if (typeof value !== 'object' || value === null) return false;
  const draft = value as Record<string, unknown>;
  return (
    typeof draft.title === 'string' &&
    typeof draft.summary === 'string' &&
    Array.isArray(draft.items) &&
    draft.items.every(isOverviewItem)
  );
};

export const readOverviewDraft = (): TOverviewDraft | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isOverviewDraft(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const writeOverviewDraft = (draft: TOverviewDraft): void => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
};

export const clearOverviewDraft = (): void => {
  sessionStorage.removeItem(STORAGE_KEY);
};

export const isSameOverviewDraft = (a: TOverviewDraft, b: TOverviewDraft): boolean =>
  JSON.stringify(a) === JSON.stringify(b);
