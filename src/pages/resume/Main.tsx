import React, { useEffect, useState, useMemo } from 'react';
import { AxiosError } from 'axios';
import { format, differenceInYears, differenceInMonths } from 'date-fns';

import { getCompanies, getProjects, getStackOptions } from 'api/notion';
import { useQuery } from 'react-query';

import { useTheme } from '@mui/material/styles';

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
  const [isNewest, setNewest] = useState(true);
  const [selectedChips, setSelectedChips] = useState<FilterSelected>(filterDefault);

  const theme = useTheme();

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

    if (!isNewest) {
      return companyData.reverse();
    }
    return companyData;
  }, [companyQuery.data, isNewest, selectedChips]);

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
          period: date.start ? `${date.start}~${date.end}` : '',
          stacks: [...project.mainStack.multi_select, ...project.stack.multi_select],
          explain: project.explain.rich_text[0].plain_text,
          contents: results.text.content.split('\n'),
          numberOfParticipants: project.numberOfParticipants.number,
        } as ProjectQuery;
      });

    return projectData;
  }, [data, selectedChips]);

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

  const handleToggle = () => {
    setNewest(!isNewest);
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

          {/* <li className='list__item'>
            <span className='filter__left'>스택별 </span>
            <div className='filter__chips'>
              <Stack direction='row' flexWrap='wrap' spacing={1} useFlexGap>
                {stackSelectOptions.data ? (
                  stackSelectOptions.data.map((select: SelectProperty) => {
                    const { id, name, color } = select;
                    return (
                      <DChip
                        key={id}
                        selected={selectedChips.stack.indexOf(name) !== -1}
                        label={name}
                        color={color}
                        clickable={true}
                        parentFunction={handleChange(name, 'stack')}
                      />
                    );
                  })
                ) : (
                  <DChip color='a' label='Vue' clickable={false} />
                )}
              </Stack>
            </div>
          </li> */}
        </ul>
        <div className='sort__container'>
          <span className='sort__button' onClick={handleToggle}>
            {isNewest ? '오래된순' : '최신순'}
          </span>
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
