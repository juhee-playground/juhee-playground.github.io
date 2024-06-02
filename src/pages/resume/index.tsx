import { useState, useMemo, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';

import COMPANY_DATA from '@/data/DB_company.json';
import DB_SKILL from '@/data/DB_skill.json';
import PROJECT_DATA from '@/data/DB_project.json';

import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Loading from '@/components/Loading';
import LeftSection from '@/pages/resume/lnb/Nav';
import CardListItem from '@/pages/resume/card/CardListItem';
import FilterOption from './filter/FilterOption';
import PointStackCard from './pointStack/Card';

import './Main.scss';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useSkillOptionQuery from '@/hooks/queries/useSkillOptionsQuery';

const DB_COMPANY_DATAS = COMPANY_DATA as CompanyProperties[];
const DB_PROJECT_DATAS = PROJECT_DATA as ProjectProperties[];

export default function Main() {
  const [sortValue, setSortValue] = useState('N');
  const [selectedCompanies, setSelectedCompanies] = useState<Array<string>>();
  const [selectedSkillOptions, setSelectedSkillOptions] = useState<Array<string>>();

  const theme = useTheme();
  const { pointColor, isPrintMode } = useAppSelector((state: RootState) => state.settings);

  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();
  const mainSkillSelectOptions = useSkillOptionQuery('mainSkill');

  const handleChangeSelectedCompanies = (company: string) => {
    setSelectedCompanies(prev =>
      prev?.includes(company) ? prev.filter(companyName => companyName !== company) : [...(prev || []), company],
    );
  };

  const handleChangeSelectedSkillOptions = (skill: string) => {
    setSelectedSkillOptions(prev =>
      prev?.includes(skill) ? prev.filter(skillName => skillName !== skill) : [...(prev || []), skill],
    );
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSortValue(event.target.value);
  };

  const mode = isPrintMode ? 'print' : '';

  const toyProjectData = useMemo(
    () => (companyQuery.data || DB_COMPANY_DATAS).filter(company => company.type.rich_text[0].plain_text === 'T'),
    [companyQuery.data],
  );

  const companies = useMemo(
    () =>
      (companyQuery.data || DB_COMPANY_DATAS)
        .filter(company => company.type.rich_text[0].plain_text === 'C')
        .map(company => company.name.title[0].plain_text),
    [companyQuery.data],
  );

  const skillOptions = useMemo(
    () => (mainSkillSelectOptions.data ? mainSkillSelectOptions.data.map(select => select.name) : DB_SKILL),
    [mainSkillSelectOptions.data],
  );

  const parseCompanyQuery: CompanyProperties[] = useMemo(() => {
    const companyData = (companyQuery.data || DB_COMPANY_DATAS)
      .filter((company: CompanyProperties) => selectedCompanies?.includes(company.name.title[0].plain_text))
      .sort((firstObject: CompanyProperties, secondObject: CompanyProperties) =>
        firstObject.order.number > secondObject.order.number ? 1 : -1,
      );

    return /O/.test(sortValue) ? companyData.reverse() : companyData;
  }, [companyQuery.data, sortValue, selectedCompanies]);

  const parseProjectQuery: ProjectProperties[] = useMemo(
    () =>
      (projectQuery.data || DB_PROJECT_DATAS).filter((project: ProjectProperties) => {
        const skillInfo = JSON.stringify(project.mainSkill.multi_select);

        return selectedSkillOptions?.some(item => {
          const regex = new RegExp(item);

          return regex.test(skillInfo);
        });
      }),
    [projectQuery.data, selectedSkillOptions],
  );

  useEffect(() => {
    !selectedCompanies && setSelectedCompanies(companies);
  }, [companies, selectedCompanies]);

  useEffect(() => {
    !selectedSkillOptions && setSelectedSkillOptions(skillOptions);
  }, [skillOptions, selectedSkillOptions]);

  return (
    <>
      <LeftSection />
      <div
        className={`section-right section-right--${theme.palette.mode} ${isPrintMode ? `section-right--${mode}` : ''}`}
      >
        {projectQuery.isLoading ? <Loading /> : null}

        <section className={isPrintMode ? `action--${mode}` : 'action'}>
          <ul className='filter__container'>
            <FilterOption
              options={companies}
              title='company'
              selected={selectedCompanies}
              pointColor={pointColor}
              onChange={handleChangeSelectedCompanies}
            />
            <FilterOption
              options={skillOptions}
              colorOptions={mainSkillSelectOptions.data}
              pointColor={pointColor}
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
                <MenuItem sx={{ color: `${theme.palette.mode === 'dark' ? 'white' : 'black'}` }} value={'N'}>
                  최신순
                </MenuItem>
                <MenuItem sx={{ color: `${theme.palette.mode === 'dark' ? 'white' : 'black'}` }} value={'O'}>
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
            <h4 style={{ color: pointColor }} className='box-title'>
              CAREER
            </h4>
          </div>

          {parseCompanyQuery.map((company: CompanyProperties, index: number) => (
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
            <h4 style={{ color: pointColor }} className='box-title'>
              SIDE PROJECT
            </h4>
          </div>

          {toyProjectData
            .filter(company => company.type.rich_text[0].plain_text === 'T')
            .map((company: CompanyProperties, index: number) => (
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
