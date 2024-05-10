
import DChip from "@/components/custom/DChip";

import ultimate from '@/assets/screenshot/ultimate.png';

import "./Card.scss";

interface Props {
  mainSkills: any;
  skills: any;
}
export default function ProjectCard({mainSkills, skills}: Props) {

  return (
    <article className="card">
      <header>
        <h3>OHCOACH Ultimate</h3>
        <p>2020.01 ~ 2022.11</p>
      </header>
      <div className='card__content'>
        <img src={ultimate} alt="OHCOACH Ultimate 화면" height="100" content=""  />
        <section>
          타사 서비스를 대체하기 위해 회사에 맞춤형으로 개발된 사내 시스템 구축. 구매, 근태, 생산, 출고 등 다양한 모듈을 포함하고 있는 서비스.
        </section>
        <section>
          {mainSkills.map((select: SelectProperty) => (
            <DChip
              key={`mainSkill_${select.name}_${select.id}`}
              size='small'
              color={select.color}
              label={select.name}
              clickable={false}
            />
          ))}
          {skills.map((select: SelectProperty, index: number) => (
            <DChip
            key={`skill_${select.name}_${index}`}
            size='small'
            color='grey'
            label={select.name}
            clickable={false}
            />
          ))}
        </section>
        <section>
          <h3>성과</h3>
          타사 서비스를 대체하기 위해 회사에 맞춤형으로 개발된 사내 시스템 구축.
구매, 근태, 생산, 출고 등 다양한 모듈을 포함하고 있는 서비스.
        </section>
        <section>
          <h3>트러블슈팅</h3>
        </section>
      </div>
    </article>
  );
}
