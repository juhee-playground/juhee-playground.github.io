import React from 'react';
import { useAppSelector } from 'redux/hooks';
import type { RootState } from 'redux/store';

import LabelIcon from '@mui/icons-material/Label';
import Stack from '@mui/material/Stack';
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
    mainSkills: [...props.info.mainSkill.multi_select],
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
          <span className='text text__subTitle'>{projectData.name}</span>
        </a>
        <span className='numbers text__sub'>
          <span className='text text__plain period'>{projectData.period}</span>
        </span>
      </div>
      <div>
        <span className='text text__sub'>참여인원: </span>
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
                key={`stacks__${select.id}`}
                size='small'
                color={select.color}
                label={select.name}
                clickable={false}
              />
            ))}
            {projectData.skills.map((skill: SelectProperty) => (
              <DChip
                key={`stacks__${skill.id}`}
                size='small'
                color='grey'
                label={skill.name}
                clickable={false}
              />
            ))}
          </Stack>
        </ul>
      </div>
      <div className='list__item results'>
        {projectData.experience.map((text: string, index) => {
          const boldTexts = boldSentence.filter((bold) => text.includes(bold));
          const [first, last] = text.split(boldTexts[0]);
          if (boldTexts.length > 0) {
            return (
              <>
                <div>
                  <span key={`content_first_${index}`} className='text text__plain'>
                    {first}
                  </span>
                  <span key={`content_bold_${index}`} className='text text__plain text__bold'>
                    {boldTexts[0]}
                  </span>
                  <span key={`content_last${index}`} className='text text__plain'>
                    {last}
                  </span>
                </div>
              </>
            );
          } else {
            return (
              <span key={`result_content_${index}`} className='text text__plain'>
                {text}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
}

export default SubListItem;
