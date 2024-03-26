import React, { useEffect, useState, useMemo } from 'react';
import { useAppSelector } from 'redux/hooks';
import type { RootState } from 'redux/store';
import { AxiosError } from 'axios';

import { getCompanies, getProjects, getSkillOptions } from 'api/notion';
import { useQuery } from 'react-query';

import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import './Main.scss';
import Loading from 'components/Loading';
import CardListItem from 'pages/resume/card/CardListItem';
import FilterOption from './filter/FilterOption';

import COMPANY_DATA from 'data/DB_company.json';
import DB_SKILL from 'data/DB_skill.json';
import PROJECT_DATA from 'data/DB_project.json';
import PointStackCard from './pointStack/Card';

const filterDefault = {
  company: [],
  skill: [],
};

export default function Main() {
  const DB_COMPANY_DATAS = COMPANY_DATA as CompanyProperties[];
  const DB_PROJECT_DATAS = PROJECT_DATA as ProjectProperties[];
  const [sortValue, setSortValue] = useState('N');
  const [selectedChips, setSelectedChips] = useState<FilterSelected>(filterDefault);

  const theme = useTheme();
  const { pointColor, isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  const companyQuery = useQuery<NotionData[], AxiosError, CompanyProperties[]>(['getCompanies'], () => getCompanies(), {
    select: query =>
      query.map(data => {
        return {
          ...data.properties,
          id: data.id,
        };
      }),
  });

  const projectQuery = useQuery<NotionData[], AxiosError, ProjectProperties[]>(
    ['getProjects'],
    async () => {
      const response = await getProjects();
      return response;
    },
    {
      select: query =>
        query.map(data => {
          return {
            ...data.properties,
            id: data.id,
          };
        }),
    },
  );

  const mainSkillSelectOptions = useQuery<SelectProperty[], AxiosError, SelectProperty[]>(['getSkillOptions'], () =>
    getSkillOptions({ property: 'mainSkill' }),
  );

  const companiesData = companyQuery.data === undefined ? DB_COMPANY_DATAS : companyQuery.data;
  const projectsData = projectQuery.data === undefined ? DB_PROJECT_DATAS : projectQuery.data;
  const toyProjectData = companiesData.filter(company => company.type.rich_text[0].plain_text === 'T');

  const parseCompanyQuery: CompanyProperties[] = useMemo(() => {
    const companyData = companiesData
      .filter((company: CompanyProperties) => {
        const filtering = selectedChips.company?.includes(company.name.title[0].plain_text);
        return filtering;
      })
      .sort((firstObject: CompanyProperties, secondObject: CompanyProperties) => {
        return firstObject.order.number > secondObject.order.number ? 1 : -1;
      });

    if (sortValue === 'O') {
      return companyData.reverse();
    }

    return companyData;
  }, [companyQuery.data, sortValue, selectedChips]);

  const companyLength = parseCompanyQuery.length - 1;

  const parseProjectQuery: ProjectProperties[] = useMemo(() => {
    const projectData = projectsData.filter((project: ProjectProperties) => {
      const skillInfo = JSON.stringify(project.mainSkill.multi_select);
      let isSelected = false;

      selectedChips.skill.forEach(item => {
        const skillRegex = new RegExp(item);

        if (!isSelected) {
          isSelected = skillRegex.test(skillInfo);
        }
      });
      return isSelected;
    });
    return projectData;
  }, [projectQuery, selectedChips]);

  const companies = useMemo(
    () =>
      companiesData
        .filter(company => company.type.rich_text[0].plain_text === 'C')
        .map(company => company.name.title[0].plain_text),
    [companyQuery.data, DB_COMPANY_DATAS],
  );

  const skillOptions = useMemo(
    () => (mainSkillSelectOptions.data ? mainSkillSelectOptions.data.map(select => select.name) : DB_SKILL),
    [mainSkillSelectOptions.data, DB_SKILL],
  );

  const handleChange = (option: string, key: string) => {
    setSelectedChips((prevChips: FilterSelected): FilterSelected => {
      const newChips = JSON.parse(JSON.stringify(prevChips));
      if (prevChips[key].includes(option)) {
        newChips[key] = prevChips[key].filter((chip: string) => chip !== option);
      } else {
        newChips[key] = [...prevChips[key], option];
      }
      return newChips;
    });
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSortValue(event.target.value);
  };

  useEffect(() => {
    setSelectedChips(prev => ({
      ...prev,
      company: [...companies],
      skill: [...skillOptions],
    }));
  }, [companies, skillOptions]);

  return (
    <div
      className={`section-right section-right--${theme.palette.mode} ${isPrintMode ? `section-right--${mode}` : ''}`}
    >
      {projectQuery.isLoading ? <Loading /> : null}
      <section className={isPrintMode ? `action--${mode}` : 'action'}>
        <ul className='filter__container'>
          <FilterOption
            options={companies}
            type='company'
            selected={selectedChips}
            pointColor={pointColor}
            onChange={handleChange}
          />
          <FilterOption
            options={skillOptions}
            colorOptions={mainSkillSelectOptions.data}
            type='skill'
            selected={selectedChips}
            onChange={handleChange}
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
        {parseCompanyQuery.map((company: CompanyProperties, index: number) => {
          return (
            <CardListItem
              key={company.id}
              info={company}
              subInfo={parseProjectQuery}
              filters={selectedChips}
              isLastCompany={index === companyLength}
            />
          );
        })}
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
          .map((company: CompanyProperties, index: number) => {
            return (
              <CardListItem
                key={company.id}
                info={company}
                filters={selectedChips}
                subInfo={parseProjectQuery}
                isLastCompany={index === companyLength}
              />
            );
          })}
      </section>
    </div>
  );
}
