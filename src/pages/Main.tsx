import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { AxiosError } from 'axios';
import { format, differenceInYears, differenceInMonths } from 'date-fns';

import { getCompanies, getProjects, getStackOptions } from '../api/notion';
import { useQuery } from 'react-query';

import './Main.scss';
import Stack from '@mui/material/Stack';
import LabelIcon from '@mui/icons-material/Label';
import DChip from '@/components/custom/DChip';
import ToggleChip from '@/components/custom/ToggleChip';
import CircularProgress from '@mui/material/CircularProgress';

interface filterSelected {
  [key: string]: string[];
}

const filterDefault = {
  company: [],
  stack: [],
};

export default function Main() {
  const [isNewest, setNewest] = useState(true);
  const [selectedChips, setSelectedChips] = useState<filterSelected>(filterDefault);

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

  const projectQuery = useQuery<NotionData[], AxiosError, NotionProperties[]>(
    ['getProjects'],
    () => getProjects(),
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

  const stackSelectOptions = useQuery<SelectProperty[], AxiosError, SelectProperty[]>(
    ['getStackOptions'],
    () => getStackOptions(),
  );

  const parseCompanyQuery: CompanyQuery[] = useMemo(() => {
    if (!companyQuery.data) {
      return [] as CompanyQuery[];
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
            ${noYear ? '' : year}년 
            ${noNumberOfMonths ? '' : numberOfMonths}개월 
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
    if (!projectQuery.data) {
      return [] as ProjectQuery[];
    }

    const projectData = projectQuery.data
      .filter((project) => {
        const stackInfo = JSON.stringify(project.stack.multi_select);
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
          stacks: project.stack.multi_select,
          explain: project.explain.rich_text[0].plain_text,
          contents: results.text.content.split('\n'),
          numberOfParticipants: project.numberOfParticipants.number,
        } as ProjectQuery;
      });

    return projectData;
  }, [projectQuery.data, selectedChips]);

  const companies = useMemo(
    () => (companyQuery.data ? companyQuery.data.map((company) => company.name.title[0].plain_text) : []),
    [companyQuery.data],
  );

  const stackOptions = useMemo(
    () => (stackSelectOptions.data ? stackSelectOptions.data.map((select) => select.name) : []),
    [stackSelectOptions.data],
  );

  // useCallback children 에 함수 감싸주면 좋음
  const handleChange = useCallback(
    (option: string, key: string) => () => {
      setSelectedChips((prevChips: filterSelected): filterSelected => {
        const newChips = JSON.parse(JSON.stringify(prevChips));
        if (prevChips[key].includes(option)) {
          newChips[key] = prevChips[key].filter((chip: string) => chip !== option);
        } else {
          newChips[key] = [...prevChips[key], option];
        }
        return newChips;
      });
    },
    [],
  );

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
    <div className='section-right'>
      <section className='action'>
        <ul className='filter__container'>
          <li className='list__item'>
            <span className='filter__left'>회사별 </span>
            <div className='filter__chips'>
              <Stack direction='row' spacing={1}>
                {companies.map((company: string, index: number) => (
                  <ToggleChip
                    key={`company_${index}`}
                    selected={selectedChips.company.indexOf(company) !== -1}
                    label={company}
                    color='primary'
                    clickable={true}
                    parentFunction={handleChange(company, 'company')}
                  />
                ))}
              </Stack>
            </div>
          </li>
          <li className='list__item'>
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
                        color={color}
                        label={name}
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
          </li>
        </ul>
        <div className='sort__container'>
          <span className='sort__button' onClick={handleToggle}>
            {isNewest ? '최신순' : '오래된순'}
          </span>
        </div>
      </section>
      <section className='career'>
        {companyQuery.data ? (
          parseCompanyQuery.map((company: CompanyQuery) => {
            const { startDate, endDate, period, name, role, department, id }: CompanyQuery = company;
            return (
              <div key={id} className='box__container'>
                <div className='left'>
                  <span className='text__sub'>{startDate}</span>
                  <span className='text__plain'> {startDate !== '' ? `~` : null} </span>
                  <span className='text__sub'>{endDate}</span>
                  <div className='text__plain'>{period}</div>
                </div>
                <div className='right'>
                  <span className='text__title'>{name}</span>
                  <div className='list chip'>
                    <span className='text__plain'>{role}</span>
                    <span className='text__plain'> / </span>
                    <span className='text__plain'>{department}</span>
                  </div>
                  <div className='projects'>
                    {projectQuery.data ? (
                      parseProjectQuery
                        .filter((project) => project.companyId === id)
                        .map((project: ProjectQuery) => {
                          const { numberOfParticipants, stacks, contents }: ProjectQuery = project;
                          return (
                            <div className='project__container' key={project.id}>
                              <div className='title'>
                                <LabelIcon fontSize='small' className='text__icon--pre' />
                                <span className='text__subTitle'>{project.name}</span>
                                <span className='numbers text__sub'>
                                  | 참여인원: <span className='text__sub'>{numberOfParticipants}</span>
                                </span>
                              </div>
                              <div className='explain'>
                                <span className='text__plain'>{project.explain}</span>
                              </div>
                              <div className='period'>
                                <span className='text__plain'>{project.period}</span>
                              </div>
                              <div className='stacks'>
                                <ul className='list__container'>
                                  <Stack direction='row' spacing={1}>
                                    {stacks.map((select: SelectProperty) => (
                                      <DChip
                                        key={select.id}
                                        color={select.color}
                                        label={select.name}
                                        clickable={false}
                                      />
                                    ))}
                                  </Stack>
                                </ul>
                              </div>
                              <div className='results'>
                                {contents.map((text: string, index: number) => (
                                  <span key={`result_content${index}`} className='text__plain'>
                                    {text}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <CircularProgress color='primary' variant='determinate' />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <CircularProgress color='primary' variant='determinate' />
        )}
      </section>
    </div>
  );
}
