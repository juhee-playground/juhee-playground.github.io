import loadingImage from '@/assets/images/apng_loader-ball.png';

import './Loading.scss';

const Loading = () => {
  return (
    <div className='loading__container'>
      <img src={loadingImage} loading='lazy' alt='loadingImage' />
    </div>
  );
};

export default Loading;
