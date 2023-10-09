import React from 'react';

import './card.scss';
import CONTENT_SOCAR from '../../../constants/StackContent';

interface CardContentProperty {
  content: string;
  link?: string;
  bold: string;
}

const contents = CONTENT_SOCAR;

const PointStackCard = () => {
  return (
    <div className='card card__container'>
      <h3 className='card__title'>간단 소개</h3>
      <ul className='card__content'>
        {contents.map((card: CardContentProperty) => {
          const { content, link, bold } = card;
          const [prefix, suffix] = content.split(bold);
          if (bold !== '') {
            return (
              <li className='content__li' key={content}>
                {prefix}{' '}
                <a href={link}>
                  <b>{bold}</b>
                </a>{' '}
                {suffix}
              </li>
            );
          } else {
            return (
              <li className='content__li' key={content}>
                {content}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default PointStackCard;
