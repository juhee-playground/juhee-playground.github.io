import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';

import { cn } from '@/utils/classNames';

interface IProjectSelectionEditorProps {
  readonly projects: readonly IProjectData[];
  readonly selectedIds: readonly string[];
  readonly pointColorHex: string;
  readonly onToggle: (projectId: string) => void;
}

export const ProjectSelectionEditor = ({
  projects,
  selectedIds,
  pointColorHex,
  onToggle,
}: IProjectSelectionEditorProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <div
      className={cn(
        'mt-3 rounded-lg border p-3',
        isDark ? 'border-white/12 bg-white/4' : 'border-black/10 bg-black/[0.02]',
      )}
    >
      <p className={cn('mb-2 text-[11px]', isDark ? 'text-white/45' : 'text-black/45')}>
        isVisible 기본 선택 · 숨긴 프로젝트도 체크해서 이력서에 넣을 수 있어요
      </p>
      <div className='flex flex-wrap gap-2'>
        {projects.map(project => {
          const isChecked = selectedIds.includes(project.id);
          return (
            <button
              key={project.id}
              type='button'
              onClick={() => onToggle(project.id)}
              className={cn(
                'inline-flex items-center gap-1 rounded border px-2 py-1 text-xs transition-colors',
                isChecked ? 'font-medium' : isDark ? 'border-white/20 text-white/45' : 'border-black/15 text-black/40',
              )}
              style={
                isChecked
                  ? {
                      color: pointColorHex,
                      borderColor: pointColorHex,
                      backgroundColor: isDark ? '#000' : undefined,
                    }
                  : undefined
              }
            >
              {isChecked && <CheckIcon sx={{ fontSize: 14 }} />}
              <span>{project.name || project.id}</span>
              {!project.isVisible && (
                <span className={cn('text-[10px]', isDark ? 'text-white/35' : 'text-black/35')}>hidden</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
