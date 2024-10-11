import ReactIcon from '@/assets/icon/React.svg';
import VueIcon from '@/assets/icon/Vue.svg';
import Card from '@/components/common/Card';

import './Main.scss';

export default function MainPage() {
  return (
    <article className='dashbaord__wrapper'>
      <div className='widget__container'>
        <h3 className='widget__title'>PROJECTS</h3>
        <div className='widget__wrapper'>
          <Card image={ReactIcon} name='React' count={4} />
          <Card image={VueIcon} name='Vue' count={6} />
        </div>
      </div>
      <div className='widget__container'>
        <h3 className='widget__title'>COMPANY</h3>
        <div className='widget__wrapper'>
          <Card name='Fitogether' count={4} />
          <Card name='YU partners' count={1} />
        </div>
      </div>
    </article>
  );
}
