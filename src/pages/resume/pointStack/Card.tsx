import { useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';

import './card.scss';
import CONTENT_MAIN from '@/constants/description';

interface CardContentProperty {
  content: string;
  link?: string;
  bold: string;
}

const contents = CONTENT_MAIN;

const PointStackCard = () => {
  const { pointColor } = useAppSelector((state: RootState) => state.settings);
  return (
    <div className='card card__container'>
      <div className='group__header'>
        <span className='box-icon'>⚽️</span>

        <h4 style={{ color: pointColor }} className='box-title'>
          OVERVIEW
        </h4>
      </div>

      <ul className='card__content'>
        {contents.map((card: CardContentProperty) => {
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
