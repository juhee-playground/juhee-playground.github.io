import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { getCompanies, getProjects } from '../api/notion';
import { useQuery } from 'react-query';

import './Main.scss';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import LabelIcon from '@mui/icons-material/Label';

export default function Main() {
  const companyQuery = useQuery<NotionData[], AxiosError, NotionData[]>(['getCompanies'], () =>
    getCompanies(),
  );

  const projectQuery = useQuery<NotionData[], AxiosError, NotionData[]>(['getProjects'], () => getProjects());

  return (
    <div className='section-right'>
      <section className='action'>탭 및 필터 영역</section>
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
                                    {/* <span className='numbers text__sub'>
                                      참여인원: <span className='text__sub'>{numberOfParticipants}</span>
                                    </span> */}
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

                                  <div>
                                    {explain.map((text: RichText, index: number) => (
                                      <span key={`explain_${index}`} className='text__plain'>
                                        {text.plain_text}
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
      <section className='toy'>사이드 프로젝트 영역</section>
    </div>
  );
}
