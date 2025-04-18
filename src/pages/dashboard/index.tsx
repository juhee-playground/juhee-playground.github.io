import dayjs from 'dayjs';

import PhpIcon from '@/assets/icon/PHP-Dark.svg';
import ReactIcon from '@/assets/icon/React.svg';
import VueIcon from '@/assets/icon/Vue.svg';

import PieChart from '@/components/chart/pie/d3Pie';
import TimelineChart from '@/components/chart/TimelineChart';
import CardV2 from '@/components/common/CardVersion2';

import './Main.scss';

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
];

const stackData = [
  { id: 'Vue', label: 'Vue', value: 50, color: 'hsl(153.5, 40%, 70%)' },
  { id: 'React', label: 'React', value: 30, color: 'hsl(188.98, 60%, 70%)' },
  { id: 'PHP', label: 'PHP', value: 20, color: 'hsl(235.93, 35%, 70%)' },
];

export default function MainPage() {
  return (
    <div className='dashboard'>
      <section className='dashboard__row'>
        <article className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>PROJECTS</h3>
          <ul className='dashboard__widget-content'>
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
        <article className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>COMPANYS</h3>
          <ul className='dashboard__widget-content'>
            <li>
              <CardV2 name='Fitogether' count={4} unit='year' />
            </li>
            <li>
              <CardV2 name='YU 파트너스' count={1} unit='year' />
            </li>
          </ul>
        </article>
      </section>
      <section className='dashboard__row'>
        <article className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>MAIN TECH USAGE</h3>
          <div className='dashboard__widget-content'>
            <PieChart data={stackData} width={410} height={280} />
          </div>
        </article>

        <article className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>CAREER TIMELINE</h3>
          <div className='dashboard__widget-content'>
            <TimelineChart tasks={tasks} width={500} height={300} />
          </div>
        </article>
      </section>
    </div>
  );
}
