const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen bg-[#f5f5f5]'>
      <div className='flex justify-center items-center w-[240px] h-[300px] bg-[#ffcc00] rounded-lg mb-5'>
        <span className='text-[72px] font-bold text-[#333]'>404</span>
      </div>
      <p className='text-xl text-[#333] text-center'>Oops! The page you&apos;re looking for can&apos;t be found.</p>
    </div>
  );
};

export default NotFound;
