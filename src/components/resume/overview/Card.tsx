import CONTENT_MAIN from '@/constants/description';
import { useSettings } from '@/stores/useSettings';

import './card.scss';

interface ICardContentProperty {
  content: string;
  link?: string;
  bold: string;
}

const contents = CONTENT_MAIN;

const PointStackCard = () => {
  const { pointColor } = useSettings();
  return (
    <div className='card card__container'>
      <div className='group__header'>
        <span className='box-icon'>⚽️</span>

        <h4 style={{ color: pointColor.hex }} className='box-title'>
          OVERVIEW
        </h4>
      </div>

      <ul className='card__content'>
        {contents.map((card: ICardContentProperty) => {
          const { content, link, bold } = card;
          const [prefix, suffix] = content.split(bold);
          return (
            <li key={content} className='content__li'>
              {bold ? (
                <>
                  {prefix}

                  <a href={link}>
                    <b>{bold}</b>
                  </a>

                  {suffix}
                </>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PointStackCard;
