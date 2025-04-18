import { useState, useMemo, useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

import Loading from '@/components/Loading';
import COMPANY_DATA from '@/data/DB_company.json';
import PROJECT_DATA from '@/data/DB_project.json';
import DB_SKILL from '@/data/DB_skill.json';
import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import useSkillOptionQuery from '@/hooks/queries/useSkillOptionsQuery';
import CardListItem from '@/pages/resume/card/CardListItem';
import FilterOption from '@/pages/resume/filter/FilterOption';
import PointStackCard from '@/pages/resume/overview/Card';
import LeftSection from '@/pages/resume/panel/LeftInfoPanel';

import { useAppSelector } from '@/redux/hooks';
import type { TRootState } from '@/redux/store';

import './index.scss';

const DB_COMPANY_DATAS = COMPANY_DATA as ICompanyProperties[];
const DB_PROJECT_DATAS = PROJECT_DATA as IProjectProperties[];
const ASCENDING_ORDER = 1;
const DESCENDING_ORDER = -1;

const getPlainText = (field: INotionTextField | undefined, key: 'rich_text' | 'title'): string => {
  const list = field?.[key];
  return Array.isArray(list) && list[0]?.plain_text ? list[0].plain_text : '';
};
export default function Main() {
  const [sortValue, setSortValue] = useState('N');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>();
  const [selectedSkillOptions, setSelectedSkillOptions] = useState<string[]>();

  const theme = useTheme();
  const { pointColor, isPrintMode } = useAppSelector((state: TRootState) => state.settings);

  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();
  const mainSkillSelectOptions = useSkillOptionQuery('mainSkill');

  const mode = isPrintMode ? 'print' : '';

  const toyProjectData = useMemo(() => {
    const data = companyQuery.data || DB_COMPANY_DATAS;
    return data.filter(company => getPlainText(company.type, 'rich_text') === 'T');
  }, [companyQuery.data]);

  const companies = useMemo(() => {
    const data = companyQuery.data || DB_COMPANY_DATAS;
    return data
      .filter(company => getPlainText(company.type, 'rich_text') === 'C')
      .map(company => getPlainText(company.name, 'title'))
      .filter(Boolean);
  }, [companyQuery.data]);

  const skillOptions = useMemo(
    () => mainSkillSelectOptions.data?.map((select: ISelectProperty) => select.name) || DB_SKILL,
    [mainSkillSelectOptions.data],
  );

  const parseCompanyQuery: ICompanyProperties[] = useMemo(() => {
    const companyData = (companyQuery.data || DB_COMPANY_DATAS)
      .filter(company => selectedCompanies?.includes(getPlainText(company.name, 'title')))
      .sort((a, b) => (a.order.number > b.order.number ? ASCENDING_ORDER : DESCENDING_ORDER));

    return /O/.test(sortValue) ? companyData.reverse() : companyData;
  }, [companyQuery.data, sortValue, selectedCompanies]);

  const parseProjectQuery: IProjectProperties[] = useMemo(() => {
    return (projectQuery.data || DB_PROJECT_DATAS).filter(project => {
      const skillInfo = JSON.stringify(project.mainSkill.multi_select);
      return selectedSkillOptions?.some(item => new RegExp(item).test(skillInfo));
    });
  }, [projectQuery.data, selectedSkillOptions]);

  useEffect(() => {
    if (!selectedCompanies) setSelectedCompanies(companies);
  }, [companies, selectedCompanies]);

  useEffect(() => {
    if (!selectedSkillOptions) setSelectedSkillOptions(skillOptions);
  }, [skillOptions, selectedSkillOptions]);

  const handleChangeSelect = (event: SelectChangeEvent) => setSortValue(event.target.value);

  const handleChangeSelectedCompanies = (company: string) => {
    setSelectedCompanies(prev =>
      prev?.includes(company) ? prev.filter(name => name !== company) : [...(prev || []), company],
    );
  };

  const handleChangeSelectedSkillOptions = (skill: string) => {
    setSelectedSkillOptions(prev =>
      prev?.includes(skill) ? prev.filter(name => name !== skill) : [...(prev || []), skill],
    );
  };

  return (
    <>
      <LeftSection />
      <div
        className={`section-right section-right--${theme.palette.mode} ${isPrintMode ? `section-right--${mode}` : ''}`}
      >
        {projectQuery.isLoading && <Loading />}

        <section className={isPrintMode ? `action--${mode}` : 'action'}>
          <ul className='filter__container'>
            <FilterOption
              options={companies}
              title='company'
              selected={selectedCompanies}
              color={pointColor.hex}
              onChange={handleChangeSelectedCompanies}
            />
            <FilterOption
              options={skillOptions}
              colorOptions={mainSkillSelectOptions.data}
              color={pointColor.hex}
              title='skill'
              selected={selectedSkillOptions}
              onChange={handleChangeSelectedSkillOptions}
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
                onChange={handleChangeSelect}
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

        <section className='career'>
          <div className='group__header'>
            <span className='box-icon'>⚽️</span>
            <h4 style={{ color: pointColor.hex }} className='box-title'>
              CAREER
            </h4>
          </div>

          {parseCompanyQuery.map((company, index) => (
            <CardListItem
              key={company.id}
              info={company}
              subInfo={parseProjectQuery}
              filters={companies}
              isLastCompany={!companies[index + 1]}
            />
          ))}
        </section>

        <hr className='hrBasic' />

        <section className='career'>
          <div className='group__header'>
            <span className='box-icon'>⚽️</span>
            <h4 style={{ color: pointColor.hex }} className='box-title'>
              SIDE PROJECT
            </h4>
          </div>

          {toyProjectData.map((company, index) => (
            <CardListItem
              key={company.id}
              info={company}
              filters={skillOptions}
              subInfo={parseProjectQuery}
              isLastCompany={!companies[index + 1]}
            />
          ))}
        </section>
      </div>
    </>
  );
}
