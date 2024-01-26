import React from 'react';
import { useAppSelector } from 'redux/hooks';
import type { RootState } from 'redux/store';

import LabelIcon from '@mui/icons-material/Label';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DChip from 'components/custom/DChip';

function SubListItem(props: SubListProps) {
  const date = props.info.period.date;
  const boldSentence = props.info.experience.rich_text
    .filter((rich) => rich.annotations.bold)
    .map((rich) => rich.plain_text);
  const experience = props.info.experience.rich_text.map((rich) => rich.text.content);
  const content = experience.join('').split('\n');
  const projectData = {
    id: props.info.id,
    companyId: props.info.company.relation[0].id,
    name: props.info.name.title[0].plain_text,
    period: date.start ? `${date.start}~${date.end === null ? '' : date.end}` : '',
    mainSkills: props.info.mainSkill.multi_select,
    skills: props.info.skill.multi_select,
    role: props.info.role.rich_text[0].plain_text,
    description: props.info.description.rich_text[0].plain_text,
    experience: content,
    numberOfParticipants: props.info.numberOfParticipants.number,
    url: props.info.url.url,
  };

  const { isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  return (
    <div className='project__container' key={`project__${projectData.id}`}>
      <div className='list__item list__item--vertical'>
        <a className='title__link' href={projectData.url} target='_blank' rel='noreferrer'>
          <LabelIcon fontSize='small' className='text text__icon--pre' />
          <Typography variant='subtitle1' className='text text__subTitle' gutterBottom>
            {projectData.name}
          </Typography>
        </a>
        <Box className='numbers text__sub'>
          <Typography variant='caption' color='text.primary' className='text text__plain period' gutterBottom>
            {projectData.period}
          </Typography>
        </Box>
      </div>
      <div>
        <span className='text text__plain'>참여인원: </span>
        <span className='text__sub'>{projectData.numberOfParticipants}</span>
        <span className='text text__plain'> | 역활: </span>
        <span className='text text__sub'> {projectData.role}</span>
      </div>
      <div className='list__item description'>
        <span className='text text__plain'>{projectData.description}</span>
      </div>
      <div className='list__item period'></div>
      <div className='list__item stacks'>
        <ul className={isPrintMode ? `list__container--${mode}` : 'list__container'}>
          <Stack className='stacks' direction='row' spacing={1}>
            {projectData.mainSkills.map((select: SelectProperty) => (
              <DChip
                key={`mainSkill_${projectData.name}_${select.id}`}
                size='small'
                selected
                color={select.color}
                label={select.name}
                clickable={false}
              />
            ))}
            {projectData.skills.map((select: SelectProperty, index: number) => (
              <DChip
                key={`skill_${projectData.name}_${select.name}_${index}`}
                size='small'
                color='grey'
                label={select.name}
                clickable={false}
              />
            ))}
          </Stack>
        </ul>
      </div>
      <div className='list__item experience'>
        {projectData.experience.map((text: string) => {
          const boldTexts = boldSentence.filter((bold) => text.includes(bold));
          const [first, last] = text.split(boldTexts[0]);
          if (boldTexts.length > 0) {
            return (
              <>
                <div key={text} className='contents'>
                  <Typography variant='caption' className='text text__plain' gutterBottom>
                    {first}
                  </Typography>
                  <Typography variant='caption' className='text text__plain text__bold' gutterBottom>
                    {boldTexts[0]}
                  </Typography>
                  <Typography variant='caption' className='text text__plain' gutterBottom>
                    {last}
                  </Typography>
                </div>
              </>
            );
          } else {
            return (
              <Typography key={`content_${text}`} variant='caption' className='text text__plain' gutterBottom>
                {text}
              </Typography>
            );
          }
        })}
      </div>
    </div>
  );
}

export default SubListItem;
