import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DChip from '@/components/custom/DChip';
import usePrintMode from '@/hooks/usePrintMode';

const getFallbackText = (value: unknown, richTextArray: IRichText[]) => {
  if (typeof value === 'string' && value.trim()) return value;
  return richTextArray?.map(item => item.plain_text).join('\n') ?? '';
};

const SubListItem = ({ info }: ISubListProps) => {
  const projectData = info;
  const summary = getFallbackText(projectData.summary, []) || getFallbackText(projectData.description, []);
  const impact = getFallbackText(projectData.impact, projectData.tobe);

  const { isPrintMode } = usePrintMode();

  return (
    <section className='my-3' key={`project__${projectData.id}`}>
      <div className='flex flex-col gap-1 my-1'>
        <div className='flex items-center gap-2'>
          <span aria-hidden='true' className='inline-block shrink-0 text-xs font-black leading-none'>
            ▶
          </span>
          {projectData.slug ? (
            <Link to={`/projects/${projectData.slug}`} className='text-xl font-semibold leading-none m-0 hover:underline'>
              {projectData.name}
            </Link>
          ) : (
            <h6 className='text-xl font-semibold leading-none m-0'>{projectData.name}</h6>
          )}
        </div>

        <Box className='px-1'>
          <Typography variant='caption' color='text.primary' className='text-xs font-bold leading-none m-0' gutterBottom>
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

      <p className='my-1'>
        <span className='text-sm leading-relaxed m-0 block whitespace-pre-line'>
          {summary}
        </span>
      </p>

      <div className='my-1'></div>

      <div className='flex flex-col items-start my-1'>
        <ul className={isPrintMode ? `flex flex-wrap list-none my-1 p-0` : 'flex flex-wrap list-none my-1 p-0'}>
          <Stack className='flex flex-wrap' direction='row' spacing={1}>
            {projectData.techStackOptions.map((stack, index) => (
              <DChip
                key={`tech_stack_${projectData.id}_${stack.id}_${index}`}
                size='small'
                color={stack.color}
                label={stack.name}
                clickable={false}
              />
            ))}
          </Stack>
        </ul>
      </div>

      {impact && (
        <p className='my-1'>
          <span className='text-xs leading-relaxed m-0 block opacity-75 whitespace-pre-line'>
            {impact}
          </span>
        </p>
      )}
    </section>
  );
};

export default SubListItem;
