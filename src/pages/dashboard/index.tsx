import ReactIcon from '@/assets/icon/React.svg';
import VueIcon from '@/assets/icon/Vue.svg';
import Card from '@/components/common/Card';

import './Main.scss';

export default function MainPage() {
  return (
    <article className='card__wrapper'>
      <h1>Dashboard</h1>
      <div className='card__container'>
        <Card image={ReactIcon} name='React' count={4} />
        <Card image={VueIcon} name='Vue' count={6} />
      </div>
    </article>
  );
}
