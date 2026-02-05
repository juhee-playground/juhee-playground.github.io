
interface ICardProps {
  image?: string;
  name: string;
  count: number;
  unit?: string;
}

const CardV2 = ({ image, name, count, unit }: ICardProps) => {
  return (
    <div className='rounded-lg p-5 w-20 h-[100px] flex flex-col justify-center items-center text-center bg-[#efefef] shadow-[6px_6px_13px_#a7a7a7,-6px_-6px_13px_#ffffff]'>
      {image ? (
        <div className='card2__image'>
          <img src={image} alt={name} width={40} height={40} />
        </div>
      ) : (
        <div className='m-0 flex items-center min-h-[40px]'>
          <h4 className='text-[#242424] mb-3'>{name}</h4>
        </div>
      )}

      <div className='card2__content'>
        <h3 className='text-[22px] mb-[10px] font-bold text-[#333]'>{count}</h3>
        <p className='text-sm text-[#858585]'>{unit}</p>
      </div>
    </div>
  );
};

export default CardV2;
