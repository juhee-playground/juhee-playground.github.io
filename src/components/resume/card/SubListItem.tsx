import React from 'react';

import LabelIcon from '@mui/icons-material/Label';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Accordion from '@/components/Accordion';
import DChip from '@/components/custom/DChip';
import { useAppSelector } from '@/redux/hooks';
import type { TRootState } from '@/redux/store';

import RenderText from '../RenderText';

function SubListItem({ info, filters }: ISubListProps) {
  const date = info.period.date;
  // FIXME: 비어 있을 경우 에러처리 해야함.
  const projectData = {
    id: info.id,
    companyId: info.company.relation[0].id,
    name: info.name.title[0].plain_text,
    period: date.start ? `${date.start}~${date.end === null ? '' : date.end}` : '',
    mainSkills: info.mainSkill.multi_select,
    skills: info.skill.multi_select,
    role: info.role.rich_text[0].plain_text,
    description: info.description.rich_text[0].plain_text,
    asls: info.asls.rich_text,
    challenge: info.challenge.rich_text,
    tobe: info.tobe.rich_text,
    experience: info.experience.rich_text,
    numberOfParticipants: info.numberOfParticipants.number,
    url: info.url.url,
  };

  const { isPrintMode } = useAppSelector((state: TRootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  return (
    <section className='project__container' key={`project__${projectData.id}`}>
      <div className='list__item list__item--vertical'>
        <a className='title__link' href={projectData.url} target='_blank' rel='noreferrer'>
          <LabelIcon fontSize='small' className='text text__icon--pre' />
          <h6 className='text text__subTitle'>{projectData.name}</h6>
        </a>

        <Box className='numbers text__sub'>
          <Typography variant='caption' color='text.primary' className='text text__plain period' gutterBottom>
            {projectData.period}
          </Typography>
        </Box>
      </div>

      <p>
        <span className='text text__plain'>참여인원: </span>
        <span className='text__sub'>{projectData.numberOfParticipants}</span>
        <span className='text text__plain'> | 역활: </span>
        <span className='text text__sub'> {projectData.role}</span>
      </p>

      <p className='list__item description'>
        <span className='text text__plain'>{projectData.description}</span>
      </p>

      <div className='list__item period'></div>

      <div className='list__item stacks'>
        <ul className={isPrintMode ? `list__container--${mode}` : 'list__container'}>
          <Stack className='stacks' direction='row' spacing={1}>
            {projectData.mainSkills.map((select: ISelectProperty) => (
              <DChip
                key={`mainSkill_${projectData.name}_${select.id}`}
                size='small'
                color={select.color}
                label={select.name}
                selectedItems={filters}
                clickable={false}
              />
            ))}
            {projectData.skills.map((select: ISelectProperty, index: number) => (
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
        <div className='list__item experience'>
          <Accordion
            title={
              <React.Fragment>
                <Typography variant='h6' color='textSecondary'>
                  결과
                </Typography>
                <Typography variant='body2'>
                  <RenderText richTextArray={projectData.tobe} />
                </Typography>
              </React.Fragment>
            }
          >
            <Typography variant='h6' color='textSecondary'>
              문제사항
            </Typography>
            <Typography variant='body2'>
              <RenderText richTextArray={projectData.asls} />
            </Typography>
            <Typography variant='h6' color='textSecondary'>
              해결방안
            </Typography>
            <Typography variant='body2'>
              <RenderText richTextArray={projectData.challenge} />
            </Typography>
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default SubListItem;
