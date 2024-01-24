import React from 'react';
import { useAppSelector } from 'redux/hooks';
import type { RootState } from 'redux/store';

import './card.scss';
import CONTENT_MAIN from '../../../constants/StackContent';

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
