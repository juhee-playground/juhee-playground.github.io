import React from 'react';
import { useAppSelector } from 'redux/hooks';
import type { RootState } from 'redux/store';

import LabelIcon from '@mui/icons-material/Label';
import Stack from '@mui/material/Stack';
import DChip from 'components/custom/DChip';

function SubListItem(props: SubListProps) {
  const { id, name, numberOfParticipants, explain, period, stacks, contents, url }: ProjectQuery = props.info;
  const { pointColor, isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  return (
    <div className='project__container' key={`project__${id}`}>
      <div className='list__item list__item--vertical'>
        <a className='title__link' href={url} target='_blank' rel='noreferrer'>
          <LabelIcon fontSize='small' className='text text__icon--pre' />
          <span className='text text__subTitle'>{name}</span>
        </a>
        <span className='numbers text__sub'>
          | 참여인원: <span className='text__sub'>{numberOfParticipants}</span>
        </span>
      </div>
      <div className='list__item explain'>
        <span className='text text__plain'>{explain}</span>
      </div>
      <div className='list__item period'>
        <span className='text text__plain'>{period}</span>
      </div>
      <div className='list__item stacks'>
        <ul className={isPrintMode ? `list__container--${mode}` : 'list__container'}>
          <Stack className='stacks' direction='row' spacing={1}>
            {stacks.map((select: SelectProperty) => (
              <DChip
                key={`stacks__${select.id}`}
                size='small'
                color={select.color}
                label={select.name}
                clickable={false}
              />
            ))}
          </Stack>
        </ul>
      </div>
      <div className='list__item results'>
        {contents.map((text: string, index: number) => (
          <span key={`result_content_${index}`} className='text text__plain'>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SubListItem;
