import React from 'react';

import LabelIcon from '@mui/icons-material/Label';
import Stack from '@mui/material/Stack';
import DChip from 'components/custom/DChip';

function SubListItem(props: SubListProps) {
  const { id, name, numberOfParticipants, explain, period, stacks, contents }: ProjectQuery = props.info;
  return (
    <div className='project__container' key={id}>
      <div className='title'>
        <LabelIcon fontSize='small' className='text__icon--pre' />
        <span className='text__subTitle'>{name}</span>
        <span className='numbers text__sub'>
          | 참여인원: <span className='text__sub'>{numberOfParticipants}</span>
        </span>
      </div>
      <div className='explain'>
        <span className='text__plain'>{explain}</span>
      </div>
      <div className='period'>
        <span className='text__plain'>{period}</span>
      </div>
      <div className='stacks'>
        <ul className='list__container'>
          <Stack direction='row' spacing={1}>
            {stacks.map((select: SelectProperty) => (
              <DChip key={select.id} color={select.color} label={select.name} clickable={false} />
            ))}
          </Stack>
        </ul>
      </div>
      <div className='results'>
        {contents.map((text: string, index: number) => (
          <span key={`result_content${index}`} className='text__plain'>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SubListItem;
