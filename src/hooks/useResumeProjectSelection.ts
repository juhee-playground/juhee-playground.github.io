import { useEffect, useMemo, useState } from 'react';

import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import {
  getDefaultResumeProjectIds,
  readResumeProjectSelection,
  writeResumeProjectSelection,
} from '@/lib/resumeProjectSelection';

interface IUseResumeProjectSelectionReturn {
  readonly allProjects: readonly IProjectData[];
  readonly isEditing: boolean;
  readonly selectedProjectIds: readonly string[] | undefined;
  readonly draftProjectIds: readonly string[];
  readonly startEdit: () => void;
  readonly cancelEdit: () => void;
  readonly commitEdit: () => void;
  readonly resetDraftToDefault: () => void;
  readonly toggleDraftProject: (projectId: string) => void;
}

export const useResumeProjectSelection = (): IUseResumeProjectSelectionReturn => {
  const projectQuery = useProjectsQuery();
  const allProjects = useMemo(() => {
    const projects = projectQuery.data ?? [];
    return [...projects].sort((a, b) => a.name.localeCompare(b.name));
  }, [projectQuery.data]);

  const [selectedProjectIds, setSelectedProjectIds] = useState<readonly string[]>();
  const [isEditing, setIsEditing] = useState(false);
  const [draftProjectIds, setDraftProjectIds] = useState<readonly string[]>([]);

  useEffect(() => {
    if (!projectQuery.isSuccess || !projectQuery.data) return;
    const projects = projectQuery.data;

    setSelectedProjectIds(
      current => current ?? readResumeProjectSelection() ?? getDefaultResumeProjectIds(projects),
    );
  }, [projectQuery.data, projectQuery.isSuccess]);

  const startEdit = () => {
    setDraftProjectIds(selectedProjectIds ?? getDefaultResumeProjectIds(allProjects));
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraftProjectIds([]);
  };

  const commitEdit = () => {
    setSelectedProjectIds(draftProjectIds);
    writeResumeProjectSelection(draftProjectIds);
    setIsEditing(false);
  };

  const resetDraftToDefault = () => {
    setDraftProjectIds(getDefaultResumeProjectIds(allProjects));
  };

  const toggleDraftProject = (projectId: string) => {
    setDraftProjectIds(current =>
      current.includes(projectId) ? current.filter(id => id !== projectId) : [...current, projectId],
    );
  };

  return {
    allProjects,
    isEditing,
    selectedProjectIds,
    draftProjectIds,
    startEdit,
    cancelEdit,
    commitEdit,
    resetDraftToDefault,
    toggleDraftProject,
  };
};
