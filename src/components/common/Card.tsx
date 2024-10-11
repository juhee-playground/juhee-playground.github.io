import './Card.scss';

interface ICardProps {
  image?: string;
  name: string;
  count: number;
}

const Card = ({ image, name, count }: ICardProps) => {
  return (
    <div className='card'>
      {image ? (
        <div className='card__image'>
          <img src={image} alt={name} width={40} height={40} />
        </div>
      ) : (
        <div className='card__name'>
          <h4>{name}</h4>
        </div>
      )}

      <div className='card__content'>
        <h3>{count}</h3>
      </div>
    </div>
  );
};

export default Card;
