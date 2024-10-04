import './Card.scss';

interface IStat {
  name: string;
  value: number;
}

interface ICardProps {
  image: string;
  name: string;
  type: string;
  stats: IStat[];
}

const Card = ({ image, name, type, stats }: ICardProps) => {
  return (
    <div className='card'>
      <div className='card__image'>
        <img src={image} alt={name} />
      </div>
      <div className='card__content'>
        <h2>{name}</h2>
        <p>{type}</p>
        <div className='card__stats'>
          {stats.map(stat => (
            <div key={stat.name} className='stat'>
              <span>{stat.name}</span>
              <div className='progress-bar'>
                <div className='progress-bar__fill' style={{ width: `${stat.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
