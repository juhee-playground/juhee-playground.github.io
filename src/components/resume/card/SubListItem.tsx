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
    <section className='my-3' key={`project__${projectData.id}`}>
      <div className='flex flex-col my-1'>
        <a className='flex items-start cursor-pointer text-inherit hover:underline' href={projectData.url} target='_blank' rel='noreferrer'>
          <LabelIcon fontSize='small' className='pr-1 leading-none m-0' />
          <h6 className='text-xl font-semibold leading-none m-0'>{projectData.name}</h6>
        </a>

        <Box className='px-1'>
          <Typography variant='caption' color='text.primary' className='text-sm font-bold text-xs leading-none m-0' gutterBottom>
            {projectData.period}
          </Typography>
        </Box>
      </div>

      <p className='my-1'>
        <span className='text-sm leading-none m-0'>참여인원: </span>
        <span className='text-sm font-semibold leading-none m-0'>{projectData.numberOfParticipants}</span>
        <span className='text-sm leading-none m-0'> | 역활: </span>
        <span className='text-sm font-semibold leading-none m-0'> {projectData.role}</span>
      </p>

      <p className='flex flex-col line-height-6 my-1'>
        <span className='text-sm leading-none m-0 whitespace-pre'>{projectData.description}</span>
      </p>

      <div className='my-1'></div>

      <div className='flex flex-col items-start my-1'>
        <ul className={isPrintMode ? `flex flex-wrap list-none my-1 p-0` : 'flex flex-wrap list-none my-1 p-0'}>
          <Stack className='flex flex-wrap' direction='row' spacing={1}>
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

      <div className='flex flex-col items-start my-1'>
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
