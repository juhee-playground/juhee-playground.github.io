import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { getCompanies, getProjects } from '../api/notion';
import { useQuery } from 'react-query';

import './Main.scss';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LabelIcon from '@mui/icons-material/Label';
import DChip from '@/components/custom/DChip';

export default function Main() {
  const companyQuery = useQuery<NotionData[], AxiosError, NotionData[]>(['getCompanies'], () =>
    getCompanies(),
  );

  const projectQuery = useQuery<NotionData[], AxiosError, NotionData[]>(['getProjects'], () => getProjects());

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div className='section-right'>
      <section className='action'>
        <ul className='filter__container'>
          <li className='list__item'>
            <span className='filter__left'>회사별 : </span>
            <div className='filter__chips'>
              <Stack direction='row' spacing={1}>
                <Chip
                  sx={{ borderRadius: 1 }}
                  label='핏투게더'
                  size='small'
                  variant='outlined'
                  onClick={handleClick}
                />
                <Chip sx={{ borderRadius: 1 }} label='와이유파트너스' size='small' variant='outlined' />
                <Chip sx={{ borderRadius: 1 }} label='토이프로젝트' size='small' variant='outlined' />
              </Stack>
            </div>
          </li>
          <li className='list__item'>
            <span className='filter__left'>개발 스택별 : </span>
            <div className='filter__chips'>
              <DChip
                backgroundColor='orange'
                color='#222222'
                label='Vue'
                size='small'
                onClick={handleClick}
              />
              <Chip label='Vue' size='small' onClick={handleClick} />
              <Chip label='React' size='small' />
              <Chip label='Php' size='small' />
            </div>
          </li>
          <li className='list__item'>
            <span className='filter__left'>직군별 : </span>
            <div className='filter__chips'>
              <Chip sx={{ borderRadius: 1 }} label='웹 개발자' size='small' variant='outlined' />
              <Chip sx={{ borderRadius: 1 }} label='프런트 개발자' size='small' variant='outlined' />
            </div>
          </li>
          <li className='list__item'>
            <span className='filter__left'>시간별 : </span>
            <div className='filter__chips'>
              <Chip sx={{ borderRadius: 1 }} label='최근 3개월' size='small' variant='outlined' />
              <Chip sx={{ borderRadius: 1 }} label='6개월' size='small' variant='outlined' />
              <Chip sx={{ borderRadius: 1 }} label='1년' size='small' variant='outlined' />
            </div>
          </li>
        </ul>
      </section>
      <section className='career'>
        {companyQuery.data
          ? companyQuery.data.map((company: NotionData) => {
              const names = company.properties.name.title;
              const date = company.properties.period.date;
              const departments = company.properties.department.rich_text;
              const role = company.properties.role.select;
              return (
                <div key={company.id} className='box__container'>
                  <div className='left'>
                    {/* TODO: date 일자 날리기 */}
                    <span className='text__sub'>{date.start}</span>
                    <span className='text__plain'> ~ </span>
                    <span className='text__sub'>{date.end}</span>
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
                                          <Chip
                                            className=''
                                            key={select.id}
                                            label={select.name}
                                            size='small'
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
