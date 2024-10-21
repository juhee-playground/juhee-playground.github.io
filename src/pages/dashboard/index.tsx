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
      <article className='dashboard__row'>
        <div className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>PROJECTS</h3>
          <div className='dashboard__widget-content'>
            <CardV2 image={ReactIcon} name='React' count={3} />
            <CardV2 image={VueIcon} name='Vue' count={5} />
            <CardV2 image={PhpIcon} name='Php' count={2} />
          </div>
        </div>
        <div className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>COMPANY</h3>
          <div className='dashboard__widget-content'>
            <CardV2 name='Fitogether' count={4} unit='year' />
            <CardV2 name='YU partners' count={1} unit='year' />
          </div>
        </div>
      </article>
      <article className='dashboard__row'>
        <div className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>STACK USAGE</h3>
          <div className='dashboard__widget-content'>
            <MyPieChart />
          </div>
        </div>

        {/* <div className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>경력그래프</h3>
          <div className='dashboard__widget-content'>
            <MyStackedBarChart />
          </div>
        </div>

        <div className='dashboard__widget'>
          <h3 className='dashboard__widget-title'>라인차트</h3>
          <div className='dashboard__widget-content'>
            <MyLineAreaChart />
          </div>
        </div> */}
      </article>
    </div>
  );
}
