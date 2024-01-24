import React, { useEffect, useState, useMemo } from 'react';
import { useAppSelector } from 'redux/hooks';
import type { RootState } from 'redux/store';
import { AxiosError } from 'axios';

import { getCompanies, getProjects, getStackOptions } from 'api/notion';
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
import DB_STACK from 'data/DB_stack.json';
import PROJECT_DATA from 'data/DB_project.json';
import PointStackCard from './pointStack/Card';

const filterDefault = {
  company: [],
  stack: [],
};

export default function Main() {
  const DB_COMPANY_DATAS = COMPANY_DATA as CompanyProperties[];
  const DB_PROJECT_DATAS = PROJECT_DATA as ProjectProperties[];
  const [sortValue, setSortValue] = useState('N');
  const [selectedChips, setSelectedChips] = useState<FilterSelected>(filterDefault);

  const theme = useTheme();
  const { pointColor, isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  const companyQuery = useQuery<NotionData[], AxiosError, CompanyProperties[]>(
    ['getCompanies'],
    () => getCompanies(),
    {
      select: (query) =>
        query.map((data) => {
          return {
            ...data.properties,
            id: data.id,
          };
        }),
    },
  );

  const projectQuery = useQuery<NotionData[], AxiosError, ProjectProperties[]>(
    ['getProjects'],
    async () => {
      const response = await getProjects();
      return response;
    },
    {
      select: (query) =>
        query.map((data) => {
          return {
            ...data.properties,
            id: data.id,
          };
        }),
    },
  );

  const mainStackSelectOptions = useQuery<SelectProperty[], AxiosError, SelectProperty[]>(
    ['getStackOptions'],
    () => getStackOptions({ property: 'mainSkill' }),
  );

  const companiesData = companyQuery.data === undefined ? DB_COMPANY_DATAS : companyQuery.data;
  const projectsData = projectQuery.data === undefined ? DB_PROJECT_DATAS : projectQuery.data;

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
      const stackInfo = JSON.stringify(project.mainSkill.multi_select);
      let isSelected = false;

      selectedChips.stack.forEach((item) => {
        const stackRegex = new RegExp(item);

        if (!isSelected) {
          isSelected = stackRegex.test(stackInfo);
        }
      });
      return isSelected;
    });
    return projectData;
  }, [projectQuery, selectedChips]);

  const companies = useMemo(
    () => companiesData.map((company) => company.name.title[0].plain_text),
    [companyQuery.data, DB_COMPANY_DATAS],
  );

  const stackOptions = useMemo(
    () => (mainStackSelectOptions.data ? mainStackSelectOptions.data.map((select) => select.name) : DB_STACK),
    [mainStackSelectOptions.data, DB_STACK],
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
    setSelectedChips((prev) => ({
      ...prev,
      company: [...companies],
      stack: [...stackOptions],
    }));
  }, [companies, stackOptions]);

  return (
    <div
      className={`section-right section-right--${theme.palette.mode} ${
        isPrintMode ? `section-right--${mode}` : ''
      }`}
    >
      {projectQuery.isLoading ? <Loading /> : null}
      <section className={isPrintMode ? `action--${mode}` : 'action'}>
        <ul className='filter__container'>
          <FilterOption options={companies} type='company' selected={selectedChips} onChange={handleChange} />
          <FilterOption
            options={stackOptions}
            colorOptions={mainStackSelectOptions.data}
            type='stack'
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
      {/* <section className={isPrintMode ? `career--${mode}` : 'career'}> */}
      <section className='career'>
        <div className='group__header'>
          <span className='box-icon'>⚽️</span>
          <h3 style={{ color: pointColor }} className='box-title'>
            Career
          </h3>
        </div>
        {parseCompanyQuery.map((company: CompanyProperties, index: number) => {
          return (
            <CardListItem
              key={company.id}
              info={company}
              subInfo={parseProjectQuery}
              isLastCompany={index === companyLength}
            />
          );
        })}
      </section>
    </div>
  );
}
