import ultimate from '@/assets/screenshot/ultimate.png';
import DChip from '@/components/custom/DChip';
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
  const borderColor = borderType === 'javascript' ? 'border-[#FFE165]' : 'border-[#2A6AE7]';

  return (
    <article className={`w-[15.6738rem] h-[21.8296rem] bg-[#043D45] text-white rounded-[0.75em] p-[0.5em] border-[0.875em] ${borderColor}`}>
      <header className='flex justify-between items-center'>
        <h3 className='text-[1em] my-[0.5em]'>{name}</h3>
        <p className='text-[0.6em]'>{period}</p>
      </header>

      <div className='flex flex-col gap-[0.6em]'>
        <img src={ultimate} alt='OHCOACH Ultimate 화면' height='100' className='object-contain bg-[#dddddd]' />

        <section className='flex flex-wrap gap-[0.4em] text-[0.6875em]'>
          <h4 className='m-0 text-[#d4d4d4]'>프로젝트 소개</h4>
          <p className='text-[ghostwhite] ml-[0.25em]'>{description}</p>
        </section>

        <section className='flex flex-wrap gap-[0.4em] text-[0.6875em]'>
          <ul className='flex flex-wrap gap-[0.5em] text-[0.6875em] ml-[0.25em]'>
            {mainSkill.map((skill: string, index: number) => (
              <li key={`${index}_${skill}`}>
                <img src={SKILL_ICON[skill]} className='bg-inherit' width={12} height={24} alt={`icon-${skill}`} />
              </li>
            ))}
          </ul>
        </section>

        <section className='flex flex-wrap gap-[0.4em] text-[0.6875em]'>
          <ul className='flex flex-wrap gap-[0.5em] text-[0.6875em] ml-[0.25em]'>
            {keywords?.map((select: ISelectProperty, index: number) => (
              <li key={`skill_${select.name}_${index}`}>
                <DChip size='small' color='white' label={select.name} clickable={false} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
