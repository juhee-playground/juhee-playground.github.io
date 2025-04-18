import React from 'react';

import LabelIcon from '@mui/icons-material/Label';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Accordion from '@/components/Accordion';
import DChip from '@/components/custom/DChip';
import usePrintMode from '@/hooks/usePrintMode';
import { parseProjectData } from '@/utils/parser';

import RenderText from '../RenderText';

const SubListItem = ({ info, filters }: ISubListProps) => {
  const projectData = parseProjectData(info);

  const { mode, isPrintMode } = usePrintMode();

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
                key={`mainSkill_${projectData.id}_${select.id}`}
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
    </section>
  );
};

export default SubListItem;
