import loadingImage from '@/assets/images/apng_loader-ball.png';

const Loading = () => {
  return (
    <div className='absolute w-full h-screen top-0 left-0 bg-[#ffffffb7] z-[999] flex flex-col items-center justify-center'>
      <img src={loadingImage} loading='lazy' alt='loadingImage' width={50} height={100} />
    </div>
  );
};

export default Loading;
