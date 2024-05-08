
import DChip from "@/components/custom/DChip";
import "./Card.scss";

interface Props {
  mainSkills: any;
  skills: any;
}
export default function ProjectCard({mainSkills, skills}: Props) {

  return (
    <article className="card">
      <header>
        <h2>프로젝트 이름</h2>
        <p>2023.05 ~ 2023.09</p>
      </header>
      <div className='card__content'>
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
        </section>
        <section>
          <h3>트러블슈팅</h3>
        </section>
      </div>
    </article>
  );
}
