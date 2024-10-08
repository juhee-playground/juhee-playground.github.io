import './Card.scss';

interface ICardProps {
  image: string;
  name: string;
  count: number;
}

const Card = ({ image, name, count }: ICardProps) => {
  return (
    <div className='card'>
      <div className='card__image'>
        <img src={image} alt={name} width={40} height={40} />
      </div>
      <div className='card__content'>
        <h2>{count}</h2>
      </div>
    </div>
  );
};

export default Card;
