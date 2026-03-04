import dayjs from 'dayjs';

import PhpIcon from '@/assets/icon/PHP-Dark.svg';
import ReactIcon from '@/assets/icon/React.svg';
import VueIcon from '@/assets/icon/Vue.svg';

import PieChart from '@/components/chart/pie/d3Pie';
import TimelineChart from '@/components/chart/TimelineChart';
import CardV2 from '@/components/common/CardVersion2';

const tasks: ITask[] = [
  {
    name: 'YU파트너스',
    startDate: dayjs('2017-05-02').format('YYYY-MM-DD'),
    endDate: dayjs('2018-02-28').format('YYYY-MM-DD'),
  },
  {
    name: 'Fitogether',
    startDate: dayjs('2018-07-01').format('YYYY-MM-DD'),
    endDate: dayjs('2022-11-30').format('YYYY-MM-DD'),
  },
  {
    name: '프리랜서',
    startDate: dayjs('2023-07-03').format('YYYY-MM-DD'),
    endDate: dayjs('2023-10-13').format('YYYY-MM-DD'),
  },
  {
    name: '틴들로',
    startDate: dayjs('2025-02-03').format('YYYY-MM-DD'),
    endDate: dayjs('2026-10-13').format('YYYY-MM-DD'),
  },
];

const stackData = [
  { id: 'Vue', label: 'Vue', value: 50, color: 'hsl(153.5, 40%, 70%)' },
  { id: 'React', label: 'React', value: 30, color: 'hsl(188.98, 60%, 70%)' },
  { id: 'PHP', label: 'PHP', value: 20, color: 'hsl(235.93, 35%, 70%)' },
];

export default function MainPage() {
  return (
    <div className='w-full flex flex-col items-start gap-4 bg-white'>
      <section className='w-full flex flex-wrap gap-4 items-center justify-start'>
        <article className='flex flex-col items-start justify-center p-5 px-6 rounded-lg bg-[#efefef]'>
          <h3 className='mb-6 text-2xl'>PROJECTS</h3>
          <ul className='flex flex-wrap gap-6'>
            <li>
              <CardV2 image={ReactIcon} name='React' count={3} />
            </li>
            <li>
              <CardV2 image={VueIcon} name='Vue' count={5} />
            </li>
            <li>
              <CardV2 image={PhpIcon} name='Php' count={2} />
            </li>
          </ul>
        </article>
        <article className='flex flex-col items-start justify-center p-5 px-6 rounded-lg bg-[#efefef]'>
          <h3 className='mb-6 text-2xl'>COMPANYS</h3>
          <ul className='flex flex-wrap gap-6'>
            <li>
              <CardV2 name='Fitogether' count={4} unit='year' />
            </li>
            <li>
              <CardV2 name='YU 파트너스' count={1} unit='year' />
            </li>
            <li>
              <CardV2 name='프리랜서' count={1} unit='year' />
            </li>
            <li>
              <CardV2 name='틴들로' count={1} unit='year' />
            </li>
          </ul>
        </article>
      </section>
      <section className='w-full flex flex-wrap gap-4 items-center justify-start'>
        <article className='flex flex-col items-start justify-center p-5 px-6 rounded-lg bg-[#efefef]'>
          <h3 className='mb-6 text-2xl'>MAIN TECH USAGE</h3>
          <div className='flex flex-wrap gap-6'>
            <PieChart data={stackData} width={410} height={280} />
          </div>
        </article>

        <article className='flex flex-col items-start justify-center p-5 px-6 rounded-lg bg-[#efefef]'>
          <h3 className='mb-6 text-2xl'>CAREER TIMELINE</h3>
          <div className='flex flex-wrap gap-6'>
            <TimelineChart tasks={tasks} width={500} height={300} />
          </div>
        </article>
      </section>
    </div>
  );
}
