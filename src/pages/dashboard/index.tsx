import ReactIcon from '@/assets/icon/React.svg';
import VueIcon from '@/assets/icon/Vue.svg';
import CardV2 from '@/components/common/CardVersion2';

import './Main.scss';

export default function MainPage() {
  return (
    <article className='dashbaord__wrapper'>
      <div className='widget'>
        <h3 className='title'>PROJECTS</h3>
        <div className='wrapper'>
          <CardV2 image={ReactIcon} name='React' count={4} />
          <CardV2 image={VueIcon} name='Vue' count={6} />
        </div>
      </div>
      <div className='widget'>
        <h3 className='title'>COMPANY</h3>
        <div className='wrapper'>
          <CardV2 name='Fitogether' count={4} unit='year' />
          <CardV2 name='YU partners' count={1} unit='year' />
        </div>
      </div>
    </article>
  );
}
