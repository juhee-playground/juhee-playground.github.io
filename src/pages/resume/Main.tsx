import React, { useEffect, useState, useMemo } from 'react';
import { AxiosError } from 'axios';
import { format, differenceInYears, differenceInMonths } from 'date-fns';

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

const filterDefault = {
  company: [],
  stack: [],
};

export default function Main() {
  const [sortValue, setSortValue] = useState('N');
  const [selectedChips, setSelectedChips] = useState<FilterSelected>(filterDefault);

  const theme = useTheme();
  0;
  const companyQuery = useQuery<NotionData[], AxiosError, NotionProperties[]>(
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

  const { data, isLoading } = useQuery<NotionData[], AxiosError, NotionProperties[]>(
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
    () => getStackOptions({ property: 'mainStack' }),
  );

  const parseCompanyQuery: CompanyQuery[] = useMemo(() => {
    if (!companyQuery.data) {
      if (sortValue === 'O') {
        COMPANY_DATA.reverse();
      }

      return COMPANY_DATA.filter((company) => {
        const name = company.name;
        const filtering = selectedChips.company?.includes(name);
        return filtering;
      }) as CompanyQuery[];
    }

    const companyData = companyQuery.data
      .filter((company) => {
        const name = company.name.title;
        const filtering = selectedChips.company?.includes(name[0].plain_text);
        return filtering;
      })
      .map((company: NotionProperties) => {
        const date = company.period.date;
        let year = 0;
        let month = 0;
        let period = '';
        if (date?.start) {
          year = differenceInYears(new Date(date.end), new Date(date.start));
          month = differenceInMonths(new Date(date.end), new Date(date.start));
          const isZero = year !== 0 || month !== 0;
          const noYear = year === 0;
          const numberOfMonths = month - year * 12;
          const noNumberOfMonths = numberOfMonths === 0;
          period = `${isZero ? `기간: (` : ''} 
            ${noYear ? '' : `${year}년`}
            ${noNumberOfMonths ? '' : `${numberOfMonths}개월`} 
            ${isZero ? `)` : ''}`;
        }
        return {
          id: company.id,
          name: company.name.title[0].plain_text,
          startDate: date?.start ? format(new Date(date.start), 'yyyy/MM') : '',
          endDate: date?.start ? format(new Date(date.end), 'yyyy/MM') : '',
          department: company.department.rich_text[0].plain_text,
          role: company.role.select.name,
          period,
        } as CompanyQuery;
      });

    if (sortValue === 'O') {
      return companyData.reverse();
    }
    return companyData;
  }, [companyQuery.data, sortValue, selectedChips]);

  const parseProjectQuery: ProjectQuery[] = useMemo(() => {
    if (!data) {
      return PROJECT_DATA.filter((project) => {
        const stackInfo = JSON.stringify(project.stacks);
        let isSelected = false;

        selectedChips.stack.forEach((item) => {
          const stackRegex = new RegExp(item);

          if (!isSelected) {
            isSelected = stackRegex.test(stackInfo);
          }
        });
        return isSelected;
      }) as ProjectQuery[];
    }

    const projectData = data
      .filter((project) => {
        const stackInfo = JSON.stringify(project.mainStack.multi_select);
        let isSelected = false;

        selectedChips.stack.forEach((item) => {
          const stackRegex = new RegExp(item);

          if (!isSelected) {
            isSelected = stackRegex.test(stackInfo);
          }
        });
        return isSelected;
      })
      .map((project: NotionProperties) => {
        const date = project.period.date;
        const results = project.result.rich_text[0];
        return {
          id: project.id,
          companyId: project.company.relation[0].id,
          name: project.name.title[0].plain_text,
          period: date.start ? `${date.start}~${date.end === null ? '' : date.end}` : '',
          stacks: [...project.mainStack.multi_select, ...project.stack.multi_select],
          explain: project.explain.rich_text[0].plain_text,
          contents: results.text.content.split('\n'),
          numberOfParticipants: project.numberOfParticipants.number,
          url: project.url.url,
        } as ProjectQuery;
      });

    return projectData;
  }, [data, selectedChips]);

  console.log('parseProjectQuery', parseProjectQuery);

  const companies = useMemo(
    () =>
      companyQuery.data
        ? companyQuery.data.map((company) => company.name.title[0].plain_text)
        : COMPANY_DATA.map((company) => company.name),
    [companyQuery.data, COMPANY_DATA],
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
    console.log('select change', event.target.value);
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
    <div className={`section-right section-right--${theme.palette.mode}`}>
      {isLoading ? <Loading /> : null}
      <section className='action'>
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
      </section>
      <section className='career'>
        {parseCompanyQuery.map((company: CompanyQuery) => {
          return <CardListItem key={company.id} info={company} subInfo={parseProjectQuery} />;
        })}
      </section>
    </div>
  );
}
