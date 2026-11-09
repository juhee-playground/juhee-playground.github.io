import { useEffect, useState } from 'react';

import {
  TOverviewDraft,
  clearOverviewDraft,
  getDefaultOverviewDraft,
  isSameOverviewDraft,
  readOverviewDraft,
  writeOverviewDraft,
} from '@/lib/resumeOverviewDraft';

interface IUseResumeOverviewEditReturn {
  readonly overview: TOverviewDraft;
  readonly draft: TOverviewDraft;
  readonly isEditing: boolean;
  readonly startEdit: () => void;
  readonly cancelEdit: () => void;
  readonly commitEdit: () => void;
  readonly resetDraftToDefault: () => void;
  readonly updateDraftTitle: (title: string) => void;
  readonly updateDraftSummary: (summary: string) => void;
  readonly updateDraftItemContent: (index: number, content: string) => void;
}

export const useResumeOverviewEdit = (): IUseResumeOverviewEditReturn => {
  const [overview, setOverview] = useState<TOverviewDraft>(getDefaultOverviewDraft);
  const [draft, setDraft] = useState<TOverviewDraft>(getDefaultOverviewDraft);
  const [isEditing, setIsEditing] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (hasHydrated) return;
    const saved = readOverviewDraft();
    if (saved) setOverview(saved);
    setHasHydrated(true);
  }, [hasHydrated]);

  const startEdit = () => {
    setDraft(overview);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraft(overview);
  };

  const commitEdit = () => {
    const defaults = getDefaultOverviewDraft();
    setOverview(draft);
    if (isSameOverviewDraft(draft, defaults)) {
      clearOverviewDraft();
    } else {
      writeOverviewDraft(draft);
    }
    setIsEditing(false);
  };

  const resetDraftToDefault = () => {
    setDraft(getDefaultOverviewDraft());
  };

  const updateDraftTitle = (title: string) => {
    setDraft(current => ({ ...current, title }));
  };

  const updateDraftSummary = (summary: string) => {
    setDraft(current => ({ ...current, summary }));
  };

  const updateDraftItemContent = (index: number, content: string) => {
    setDraft(current => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, content } : item,
      ),
    }));
  };

  return {
    overview,
    draft,
    isEditing,
    startEdit,
    cancelEdit,
    commitEdit,
    resetDraftToDefault,
    updateDraftTitle,
    updateDraftSummary,
    updateDraftItemContent,
  };
};
