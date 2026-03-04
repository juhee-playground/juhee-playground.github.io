import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

import Loading from '@/components/Loading';
import CareerSection from '@/components/resume/CareerSection';
import FilterOption from '@/components/resume/filter/FilterOption';
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
  selectedCompanies?: string[];
  selectedSkillOptions?: string[];
  onChangeCompany: (company: string) => void;
  onChangeSkill: (skill: string) => void;
  pointColorHex: string;
  mode: 'print' | '';
  parseCompanyQuery: ICompanyProperties[];
  parseProjectQuery: IProjectProperties[];
  toyProjectData: ICompanyProperties[];
}

const ResumeView = ({
  isLoading,
  sortValue,
  onChangeSort,
  companies,
  skillOptions,
  selectedCompanies,
  selectedSkillOptions,
  onChangeCompany,
  onChangeSkill,
  pointColorHex,
  mode,
  parseCompanyQuery,
  parseProjectQuery,
  toyProjectData,
}: IResumeViewProps) => {
  const theme = useTheme();

  return (
    <>
      <LeftSection />
      <div
        className={cn(
          'flex-1 flex flex-col py-3 px-2 min-w-0 min-h-screen',
          theme.palette.mode === 'light'
            ? 'bg-[ghostwhite] text-[#181717]'
            : 'bg-[#1d1b1b] text-white',
          mode === 'print' && 'bg-white border-t-2 border-[#666666]'
        )}
      >
        {isLoading && <Loading />}

        <section className={cn('', mode === 'print' && 'hidden')}>
          <ul className='flex flex-col gap-4'>
            <FilterOption
              options={companies}
              title='company'
              selected={selectedCompanies}
              color={pointColorHex}
              onChange={onChangeCompany}
            />
            <FilterOption
              title='skill'
              options={skillOptions}
              color={pointColorHex}
              selected={selectedSkillOptions}
              onChange={onChangeSkill}
            />
          </ul>

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
                <MenuItem sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} value='N'>
                  최신순
                </MenuItem>
                <MenuItem sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} value='O'>
                  오래된순
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <hr className='bg-[#dddddd] h-px w-full my-4' />
        </section>

        <PointStackCard />

        <hr className='bg-[#dddddd] h-px w-full my-4' />

        <CareerSection
          data={parseCompanyQuery}
          projects={parseProjectQuery}
          filters={companies}
          pointColor={pointColorHex}
        />

        <hr className='bg-[#dddddd] h-px w-full my-4' />

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
