
interface ICardProps {
  image?: string;
  name: string;
  count: number;
}

const Card = ({ image, name, count }: ICardProps) => {
  return (
    <div className='rounded-lg p-5 w-20 h-[100px] text-center relative bg-[#efefef] shadow-[6px_6px_13px_#a7a7a7,-6px_-6px_13px_#ffffff]'>
      {image ? (
        <div className='bg-[#efefef] rounded-full p-3 w-10 h-10 mx-auto mb-5 shadow-[inset_8px_8px_15px_rgba(0,0,0,0.2),inset_-8px_-8px_15px_rgba(255,255,255,0.7)]'>
          <img src={image} alt={name} width={40} height={40} className='h-auto block' />
        </div>
      ) : (
        <div className='card__name'>
          <h4>{name}</h4>
        </div>
      )}

      <div className='card__content'>
        <h3 className='text-[22px] mb-[10px] font-bold text-[#333]'>{count}</h3>
      </div>
    </div>
  );
};

export default Card;
