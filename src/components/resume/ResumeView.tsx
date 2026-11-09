import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

import Loading from '@/components/Loading';
import CareerSection from '@/components/resume/CareerSection';
import FilterOption from '@/components/resume/filter/FilterOption';
import { ProjectSelectionEditor } from '@/components/resume/filter/ProjectSelectionEditor';
import PointStackCard from '@/components/resume/overview/Card';
import LeftSection from '@/components/resume/panel/LeftInfoPanel';
import SideProjectSection from '@/components/resume/SideProjectSection';
import { cn } from '@/utils/classNames';

interface IResumeViewProps {
  isLoading: boolean;
  sortValue: string;
  onChangeSort: (event: SelectChangeEvent) => void;
  companies: string[];
  skillOptions: string[];
  projectTypeOptions: string[];
  selectedCompanies?: string[];
  selectedSkillOptions?: string[];
  selectedProjectTypes?: string[];
  onChangeCompany: (company: string) => void;
  onChangeSkill: (skill: string) => void;
  onChangeProjectType: (projectType: string) => void;
  onToggleAllCompanies: () => void;
  onToggleAllSkills: () => void;
  onToggleAllProjectTypes: () => void;
  pointColorHex: string;
  mode: 'print' | '';
  parseCompanyQuery: ICompanyData[];
  parseProjectQuery: IProjectData[];
  toyProjectData: ICompanyData[];
  allProjects: readonly IProjectData[];
  isProjectEditMode: boolean;
  draftProjectIds: readonly string[];
  onStartProjectEdit: () => void;
  onCancelProjectEdit: () => void;
  onCommitProjectEdit: () => void;
  onResetProjectEdit: () => void;
  onToggleDraftProject: (projectId: string) => void;
}

const ResumeView = ({
  isLoading,
  sortValue,
  onChangeSort,
  companies,
  skillOptions,
  projectTypeOptions,
  selectedCompanies,
  selectedSkillOptions,
  selectedProjectTypes,
  onChangeCompany,
  onChangeSkill,
  onChangeProjectType,
  onToggleAllCompanies,
  onToggleAllSkills,
  onToggleAllProjectTypes,
  pointColorHex,
  mode,
  parseCompanyQuery,
  parseProjectQuery,
  toyProjectData,
  allProjects,
  isProjectEditMode,
  draftProjectIds,
  onStartProjectEdit,
  onCancelProjectEdit,
  onCommitProjectEdit,
  onResetProjectEdit,
  onToggleDraftProject,
}: IResumeViewProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      <LeftSection />
      <div
        className={cn(
          'flex-1 flex flex-col py-3 px-4 min-w-0 min-h-screen',
          isDark ? 'bg-[#181717] text-white' : 'bg-white text-[#181717]',
        )}
      >
        {isLoading && <Loading />}

        <section className={cn('', mode === 'print' && 'hidden')}>
          <div className='mb-2 flex items-center justify-end gap-2'>
            {isProjectEditMode ? (
              <>
                <button
                  type='button'
                  onClick={onResetProjectEdit}
                  className={cn(
                    'rounded-md border px-2.5 py-1 text-xs font-medium',
                    isDark ? 'border-white/20 text-white/60' : 'border-black/15 text-black/55',
                  )}
                >
                  기본값
                </button>
                <button
                  type='button'
                  onClick={onCancelProjectEdit}
                  className={cn(
                    'rounded-md border px-2.5 py-1 text-xs font-medium',
                    isDark ? 'border-white/20 text-white/60' : 'border-black/15 text-black/55',
                  )}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={onCommitProjectEdit}
                  className='rounded-md px-2.5 py-1 text-xs font-medium text-[#111]'
                  style={{ backgroundColor: pointColorHex }}
                >
                  Done
                </button>
              </>
            ) : (
              <button
                type='button'
                onClick={onStartProjectEdit}
                aria-label='Edit projects'
                title='Edit projects'
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent',
                  isDark
                    ? 'text-white/55 hover:border-white/30 hover:text-white/85'
                    : 'text-black/45 hover:border-black/20 hover:text-black/75',
                )}
              >
                <EditOutlinedIcon sx={{ fontSize: 16 }} />
              </button>
            )}
          </div>

          <ul className='flex flex-col'>
            <FilterOption
              options={companies}
              title='company'
              selected={selectedCompanies}
              color={pointColorHex}
              onChange={onChangeCompany}
              onToggleAll={onToggleAllCompanies}
            />
            <FilterOption
              title='skill'
              options={skillOptions}
              color={pointColorHex}
              selected={selectedSkillOptions}
              onChange={onChangeSkill}
              onToggleAll={onToggleAllSkills}
            />
            <FilterOption
              title='projectType'
              options={projectTypeOptions}
              color={pointColorHex}
              selected={selectedProjectTypes}
              onChange={onChangeProjectType}
              onToggleAll={onToggleAllProjectTypes}
            />
          </ul>

          {isProjectEditMode && (
            <ProjectSelectionEditor
              projects={allProjects}
              selectedIds={draftProjectIds}
              pointColorHex={pointColorHex}
              onToggle={onToggleDraftProject}
            />
          )}

          <div
            className={cn(
              'mt-2 mb-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 text-xs',
              isDark ? 'text-white/55' : 'text-black/50',
            )}
          >
            <p>
              회사 {parseCompanyQuery.length}
              <span className='mx-1.5 opacity-40'>·</span>
              프로젝트 {parseProjectQuery.length}
            </p>
            <p>
              company {selectedCompanies?.length ?? 0}
              <span className='mx-1.5 opacity-40'>·</span>
              skill {selectedSkillOptions?.length ?? 0}
              <span className='mx-1.5 opacity-40'>·</span>
              projectType {selectedProjectTypes?.length ?? 0}
            </p>
          </div>

          <div className='flex justify-end'>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
              <InputLabel id='demo-select-small-label'>정렬방법</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-select-small'
                value={sortValue}
                label='정렬방법'
                onChange={onChangeSort}
              >
                <MenuItem sx={{ color: isDark ? 'white' : 'black' }} value='N'>
                  최신순
                </MenuItem>
                <MenuItem sx={{ color: isDark ? 'white' : 'black' }} value='O'>
                  오래된순
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </section>

        <PointStackCard />

        <CareerSection
          data={parseCompanyQuery}
          projects={parseProjectQuery}
          filters={companies}
          pointColor={pointColorHex}
        />

        <SideProjectSection
          data={toyProjectData}
          projects={parseProjectQuery}
          filters={skillOptions}
          pointColor={pointColorHex}
        />
      </div>
    </>
  );
};

export default ResumeView;
