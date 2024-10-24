import dayjs from 'dayjs';

import PhpIcon from '@/assets/icon/PHP-Dark.svg';
import ReactIcon from '@/assets/icon/React.svg';
import VueIcon from '@/assets/icon/Vue.svg';

import MyPieChart from '@/components/chart/PieChart';
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
    startDate: dayjs('2023-09-01').format('YYYY-MM-DD'),
    endDate: dayjs('2023-12-30').format('YYYY-MM-DD'),
  },
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
            <MyPieChart />
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
