
import DChip from "@/components/custom/DChip";

import ultimate from '@/assets/screenshot/ultimate.png';

import "./Card.scss";
import { skillIcon } from '@/constants/IconSet';

interface Props {
  name: string;
  period: string;
  description: string;
  borderType: 'javascript' | 'typescript';
  skill: SelectProperty[];
  mainSkill: string[];
  keywords?: SelectProperty[];
}
export default function ProjectCard({name, period, description, borderType, skill, mainSkill, keywords}: Props) {
  return (
    <article className={`card ${borderType === 'javascript' ? 'javascript' : 'typescript'}`}>
      <header>
        <h3>{name}</h3>
        <p>{period}</p>
      </header>
      <div className='card__content'>
        <img src={ultimate} alt="OHCOACH Ultimate 화면" height="100" content=""  />
        <section>
          <h4>프로젝트 소개</h4>
          <p>{description}</p>
        </section>
        <section>
          <ul className='chipList'>
            {mainSkill ? mainSkill.map((skill: string, index: number) => (
              <li key={`${index}_${skill}`}>
                <img src={skillIcon[skill]} className='icon' width={24} height={24} alt={`icon-${skill}`} />
              </li>
            )): ''}
          </ul>
        </section>
        <section>
          <ul className='chipList'>
            {keywords ? keywords.map((select: SelectProperty, index: number) => (
              <li><DChip
                key={`skill_${select.name}_${index}`}
                size='small'
                color='grey'
                label={select.name}
                clickable={false}
              /></li>
            )): ''}
          </ul>
        </section>
        <section>
          <h4>상황</h4>
        </section>
      </div>
    </article>
  );
}
