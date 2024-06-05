import DChip from '@/components/custom/DChip';

import ultimate from '@/assets/screenshot/ultimate.png';

import './Card.scss';
import { SKILL_ICON } from '@/constants/icon';

interface ICardProps {
  name: string;
  period: string;
  description: string;
  borderType: 'javascript' | 'typescript';
  skill: ISelectProperty[];
  mainSkill: string[];
  keywords?: ISelectProperty[];
}
export default function ProjectCard({ name, period, description, borderType, mainSkill, keywords }: ICardProps) {
  return (
    <article className={`card ${borderType === 'javascript' ? 'javascript' : 'typescript'}`}>
      <header>
        <h3>{name}</h3>
        <p>{period}</p>
      </header>

      <div className='card__content'>
        <img src={ultimate} alt='OHCOACH Ultimate 화면' height='100' content='' />
        <section>
          <h4>프로젝트 소개</h4>
          <p>{description}</p>
        </section>

        <section>
          <ul className='chipList'>
            {mainSkill.map((skill: string, index: number) => (
              <li key={`${index}_${skill}`}>
                <img src={SKILL_ICON[skill]} className='icon' width={24} height={24} alt={`icon-${skill}`} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <ul className='chipList'>
            {keywords?.map((select: ISelectProperty, index: number) => (
              <li key={`skill_${select.name}_${index}`}>
                <DChip
                  size='small'
                  color='white'
                  label={select.name}
                  clickable={false}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
