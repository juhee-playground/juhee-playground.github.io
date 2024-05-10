
import DChip from "@/components/custom/DChip";

import ultimate from '@/assets/screenshot/ultimate.png';

import "./Card.scss";

interface Props {
  name: string;
  period: string;
  description: string;
  mainSkills: any;
  skills: any;
  keywords: any;
}
export default function ProjectCard({name, period, description, mainSkills, skills, keywords}: Props) {

  return (
    <article className="card">
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
          <h4>Stack ICON</h4>
          {/* TODO: stack Icon list로 변경하기 */}
          <ul className='chipList'>
            <li></li>
          </ul>
        </section>
        <section>
          <h4>키워드</h4>
          <ul className='chipList'>
            {keywords.map((select: SelectProperty, index: number) => (
              <li><DChip
                key={`skill_${select.name}_${index}`}
                size='small'
                color='grey'
                label={select.name}
                clickable={false}
              /></li>
            ))}
          </ul>
        </section>
        <section>
          <h4>상황</h4>
        </section>
      </div>
    </article>
  );
}
