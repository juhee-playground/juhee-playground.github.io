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

import './index.scss';

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
      <div className={`section-right section-right--${theme.palette.mode} ${mode ? `section-right--${mode}` : ''}`}>
        {isLoading && <Loading />}

        <section className={mode ? `action--${mode}` : 'action'}>
          <ul className='filter__container'>
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

          <div className='sort__container'>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
              <InputLabel id='demo-select-small-label'>정렬방법</InputLabel>
              <Select
                className='sort__select-input'
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

          <hr className='hrBasic' />
        </section>

        <PointStackCard />

        <hr className='hrBasic' />

        <CareerSection
          data={parseCompanyQuery}
          projects={parseProjectQuery}
          filters={companies}
          pointColor={pointColorHex}
        />

        <hr className='hrBasic' />

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
