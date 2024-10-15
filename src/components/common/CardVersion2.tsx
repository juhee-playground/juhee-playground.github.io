import './CardVersion2.scss';

interface ICardProps {
  image?: string;
  name: string;
  count: number;
  unit?: string;
}

const CardV2 = ({ image, name, count, unit }: ICardProps) => {
  return (
    <div className='card2'>
      {image ? (
        <div className='card2__image'>
          <img src={image} alt={name} width={40} height={40} />
        </div>
      ) : (
        <div className='card2__name'>
          <h4>{name}</h4>
        </div>
      )}

      <div className='card2__content'>
        <h3>{count}</h3>
        <p>{unit}</p>
      </div>
    </div>
  );
};

export default CardV2;
