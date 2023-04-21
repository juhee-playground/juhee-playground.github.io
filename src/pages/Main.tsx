import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { format, differenceInYears, differenceInMonths } from 'date-fns';

import { getCompanies, getProjects, getStackOptions, getRoleOptions } from '../api/notion';
import { useQuery } from 'react-query';

import './Main.scss';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import LabelIcon from '@mui/icons-material/Label';
import DChip from '@/components/custom/DChip';
import ToggleChip from '@/components/custom/ToggleChip';

interface filterSelected {
  [key: string]: string[];
}

export default function Main() {
  const companyQuery = useQuery<NotionData[], AxiosError, NotionData[]>(['getCompanies'], () =>
    getCompanies(),
  );

  const projectQuery = useQuery<NotionData[], AxiosError, NotionData[]>(['getProjects'], () => getProjects());

  const stackSelectOptions = useQuery<SelectProperty[], AxiosError, SelectProperty[]>(
    ['getStackOptions'],
    () => getStackOptions(),
  );

  // const roleSelectOptions = useQuery<SelectProperty[], AxiosError, SelectProperty[]>(['getRoleOptions'], () =>
  //   getRoleOptions(),
  // );

  const companies = companyQuery.data
    ? companyQuery.data.map((company) => company.properties.name.title[0].plain_text)
    : [];

  // const stackOptions = stackSelectOptions.data ? stackSelectOptions.data.map((select) => select.name) : [];

  const filterDefault = {
    company: [],
    stack: [],
  };

  const [selectedChips, setSelectedChips] = useState<filterSelected>(filterDefault);

  const handleChange = (option: string, key: string): void => {
    setSelectedChips((prevChips: filterSelected): filterSelected => {
      const newChips = JSON.parse(JSON.stringify(prevChips));
      if (prevChips[key].includes(option)) {
        newChips[key] = prevChips[key].filter((chip: string) => chip !== option);
      } else {
        newChips[key] = [...prevChips[key], option];
      }
      return newChips;
    });
  };

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
                    label={company}
                    color='primary'
                    clickable={true}
                    parentFunction={() => handleChange(company, 'company')}
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
                        color={color}
                        label={name}
                        clickable={true}
                        parentFunction={() => handleChange(name, 'stack')}
                      />
                    );
                  })
                ) : (
                  <DChip color='a' label='Vue' clickable={false} />
                )}
              </Stack>
            </div>
          </li>
          {/* <li className='list__item'>
            <span className='filter__left'>시간별 : </span>
            <div className='filter__chips'>
              <Chip sx={{ borderRadius: 1 }} label='최근 3개월' size='small' variant='outlined' />
              <Chip sx={{ borderRadius: 1 }} label='6개월' size='small' variant='outlined' />
              <Chip sx={{ borderRadius: 1 }} label='1년' size='small' variant='outlined' />
              <Chip sx={{ borderRadius: 1 }} label='전체' size='small' variant='outlined' />
            </div>
          </li> */}
        </ul>
        <div>
          선택한 것은:
          <p>{selectedChips ? selectedChips.company : null}</p>
          <p>{selectedChips ? selectedChips.stack : null}</p>
        </div>
      </section>
      <section className='career'>
        {companyQuery.data
          ? companyQuery.data
              .filter((company) => {
                const name = company.properties.name.title;
                console.log(selectedChips.company);
                const filtering = selectedChips.company.includes(name[0].plain_text);
                console.log(filtering);
                return filtering;
              })
              .map((company: NotionData) => {
                const names = company.properties.name.title;
                const date = company.properties.period.date;
                const departments = company.properties.department.rich_text;
                const role = company.properties.role.select;
                let startDate, endDate;
                let year = 0;
                let month = 0;
                if (date?.start) {
                  startDate = new Date(date.start);
                  endDate = new Date(date.end);
                  year = differenceInYears(endDate, startDate);
                  month = differenceInMonths(endDate, startDate);
                }
                return (
                  <div key={company.id} className='box__container'>
                    <div className='left'>
                      <span className='text__sub'>
                        {startDate !== undefined ? format(startDate, 'yyyy/MM') : null}
                      </span>
                      <span className='text__plain'> {startDate !== undefined ? `~` : null} </span>
                      <span className='text__sub'>
                        {endDate !== undefined ? format(endDate, 'yyyy/MM') : null}
                      </span>
                      <div className='text__plain'>
                        {year !== 0 || month !== 0 ? `기간: (` : null}
                        {year === 0 ? null : `${year}년`}
                        {month - year * 12 === 0 ? null : ` ${month - year * 12}개월`}
                        {year !== 0 || month !== 0 ? `)` : null}
                      </div>
                    </div>
                    <div className='right'>
                      {names.map((text: RichText, index: number) => (
                        <span key={index} className='text__title'>
                          {text.plain_text}
                        </span>
                      ))}
                      <div className='list chip'>
                        <span className='text__plain'>{role.name}</span>
                        <span className='text__plain'> / </span>
                        {departments.map((text: RichText, index: number) => (
                          <span key={index} className='text__plain'>
                            {text.plain_text}
                          </span>
                        ))}
                      </div>
                      <div className='projects'>
                        {projectQuery.data
                          ? projectQuery.data
                              .filter((project) => project.properties.company.relation[0].id === company.id)
                              // .filter((project) => {
                              //   const stacks = project.properties.stack.multi_select;
                              //   const filtering = stacks.filter((stack: string) =>
                              //     selectedChips.stack.some((chip: string) => chip === stack),
                              //   );
                              //   return filtering;
                              // })
                              .map((project: NotionData) => {
                                const names = project.properties.name.title;
                                const date = project.properties.period.date;
                                const stacks = project.properties.stack.multi_select;
                                const explain = project.properties.explain.rich_text;
                                const results = project.properties.result.rich_text;
                                const contents = results[0].text.content.split('\n');
                                const numberOfParticipants = project.properties.numberOfParticipants.number;
                                return (
                                  <div className='project__container' key={project.id}>
                                    <div className='title'>
                                      <LabelIcon fontSize='small' className='text__icon--pre' />
                                      {names.map((text: RichText, index: number) => (
                                        <span key={`project_${index}`} className='text__subTitle'>
                                          {text.plain_text}
                                        </span>
                                      ))}
                                      <span className='numbers text__sub'>
                                        | 참여인원: <span className='text__sub'>{numberOfParticipants}</span>
                                      </span>
                                    </div>
                                    <div className='explain'>
                                      {explain.map((text: RichText, index: number) => (
                                        <span key={`explain_${index}`} className='text__plain'>
                                          {text.plain_text}
                                        </span>
                                      ))}
                                    </div>
                                    <div className='period'>
                                      <span className='text__plain'>{date.start}</span>
                                      <span className='text__plain'> ~ </span>
                                      <span className='text__plain'>{date.end}</span>
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
                          : null}
                      </div>
                    </div>
                  </div>
                );
              })
          : null}
      </section>
    </div>
  );
}
