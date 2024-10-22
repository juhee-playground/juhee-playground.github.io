import PhpIcon from '@/assets/icon/PHP-Dark.svg';
import ReactIcon from '@/assets/icon/React.svg';
import VueIcon from '@/assets/icon/Vue.svg';
// import MyLineAreaChart from '@/components/chart/LineAreaChart';
import MyPieChart from '@/components/chart/PieChart';
// import MyStackedBarChart from '@/components/chart/StackedBarChart';
import CardV2 from '@/components/common/CardVersion2';

import './Main.scss';

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
              <CardV2 name='YU partners' count={1} unit='year' />
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

        {/* <article className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>경력그래프</h3>
          <div className='dashboard__widget-content'>
            <MyStackedBarChart />
          </div>
        </article>

        <article className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>라인차트</h3>
          <div className='dashboard__widget-content'>
            <MyLineAreaChart />
          </div>
        </article> */}
      </section>
    </div>
  );
}
