import { useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

import { getProjects } from '@/api/notion';
import LiveSection from '@/components/LiveSection';
import PROJECT_DATA from '@/data/DB_project.json';
import ProjectCard from './Card';

import './Main.scss';

export default function MainPage() {
  const [loading, setLoading] = useState(true);
  const DB_PROJECT_DATAS = PROJECT_DATA as ProjectProperties[];

  const projectQuery = useQuery<NotionData[], AxiosError, ProjectProperties[]>(
    ['getProjects'],
    async () => {
      setLoading(true);
      const response = await getProjects();
      setLoading(false);
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

  const projectsData = projectQuery.data === undefined ? DB_PROJECT_DATAS : projectQuery.data;

  return (
    <div className='wrapper'>
      <h1>Projects</h1>
      <h2>지금까지 참여한 프로젝트 리스트</h2>
      <div className='container'>
      { projectsData ? projectsData.map((project: ProjectProperties) => {
          const date = project.period.date;
          const period = date.start ? `${dayjs(date.start).format('YY/MM')}~${date.end === null ? '' : dayjs(date.end).format('YY/MM')}` : '';
          return (
            <ProjectCard
              key={project.id}
              name={project.name.title[0].plain_text}
              period={period}
              description={project.description.rich_text[0].plain_text}
              keywords={project.keywords && project.keywords.multi_select}
            />
          );
        }) : <LiveSection message='Please wait. Loading..' />}
      </div>
    </div>
  );
}
