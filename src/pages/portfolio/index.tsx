import dayjs from 'dayjs';

import ProjectCard from './Card';

import LiveSection from '@/components/LiveSection';
import PROJECT_DATA from '@/data/DB_project.json';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';

import './Main.scss';

export default function MainPage() {
  const { isSuccess, data: projectQueryData } = useProjectsQuery();

  return (
    <article className='wrapper'>
      <h1>Projects</h1>

      <h2>지금까지 참여한 프로젝트 리스트</h2>

      <div className='container'>
        {isSuccess ? (
          (projectQueryData || PROJECT_DATA).map((project: IProjectProperties) => {
            const date = project.period.date;
            const period = date.start ? `${dayjs(date.start).format('YY/MM')}~${dayjs(date.end).format('YY/MM')}` : '';
            const mainSkill = project.mainSkill.multi_select.map((select: ISelectProperty) => select.name);
            const scriptType = mainSkill.includes('Typescript') ? 'typescript' : 'javascript';

            return (
              <ProjectCard
                key={project.id}
                name={project.name.title[0].plain_text}
                period={period}
                description={project.description.rich_text[0].plain_text}
                borderType={scriptType}
                skill={project.skill.multi_select}
                mainSkill={mainSkill}
                keywords={project.keywords && project.keywords.multi_select}
              />
            );
          })
        ) : (
          <LiveSection message='Please wait. Loading..' />
        )}
      </div>
    </article>
  );
}
