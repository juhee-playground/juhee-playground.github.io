import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import LiveSection from '@/components/LiveSection';
import PROJECT_DATA from '@/data/DB_project.json';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';

import ProjectCard from './Card';

import './Main.scss';

export default function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isGameMode = (location.state as { gameMode?: boolean } | null)?.gameMode === true;
  const { isSuccess, data: projectQueryData } = useProjectsQuery();

  const projectList = (isSuccess ? (projectQueryData || PROJECT_DATA) : PROJECT_DATA) as IProjectProperties[];

  if (!isGameMode) {
    return (
      <article className='wrapper'>
        <h1>Projects</h1>
        <h2>지금까지 참여한 프로젝트 리스트</h2>
        <div className='container'>
          {isSuccess ? (
            projectList.map((project: IProjectProperties) => {
              const date = project.period.date;
              const period = date.start ? `${dayjs(date.start).format('YY/MM')}~${dayjs(date.end).format('YY/MM')}` : '';
              const mainSkill = project.mainSkill.multi_select.map((select: ISelectProperty) => select.name);
              return (
                <ProjectCard
                  key={project.id}
                  name={project.name.title[0].plain_text}
                  period={period}
                  description={project.description.rich_text[0].plain_text}
                  borderType={mainSkill.includes('Typescript') ? 'typescript' : 'javascript'}
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

  return (
    <motion.div
      layoutId="game-screen"
      className="min-h-screen w-full bg-[#d9f99d] text-[#2d321d] flex flex-col"
    >
      {/* 8-bit 상단 헤더 바 */}
      <div className="pixel-font border-b-2 border-[#2d321d]/30 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-[10px] font-bold border border-[#2d321d] px-3 py-1 hover:bg-[#2d321d] hover:text-[#d9f99d] transition-colors"
          >
            ← BACK
          </button>
          <span className="text-[11px] font-bold tracking-widest">PROJECTS.DB</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] opacity-60">
          <span className="animate-pulse">●</span>
          <span>JUHEE-OS v2.0</span>
        </div>
      </div>

      {/* 프로젝트 목록 */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isSuccess ? (
            projectList.map((project: IProjectProperties) => {
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
            <LiveSection message='LOADING PROJECTS...' />
          )}
        </div>
      </div>
    </motion.div>
  );
}
