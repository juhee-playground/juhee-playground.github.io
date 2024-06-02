import { useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';

import LabelIcon from '@mui/icons-material/Label';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DChip from '@/components/custom/DChip';

function SubListItem({ info, filters }: SubListProps) {
  const date = info.period.date;
  const boldSentence = info.experience.rich_text.filter(rich => rich.annotations.bold).map(rich => rich.plain_text);
  const experience = info.experience.rich_text.map(rich => rich.text.content);
  const content = experience.join('').split('\n');
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
    experience: content,
    numberOfParticipants: info.numberOfParticipants.number,
    url: info.url.url,
  };

  const { isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  return (
    <section className='project__container' key={`project__${projectData.id}`}>
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
            {projectData.mainSkills.map((select: SelectProperty) => (
              <DChip
                key={`mainSkill_${projectData.name}_${select.id}`}
                size='small'
                color={select.color}
                label={select.name}
                selectedItems={filters}
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
        {projectData.experience.map((text: string, index: number) => {
          const boldTexts = boldSentence.filter(bold => text.includes(bold));
          const [first, last] = text.split(boldTexts[0]);

          return boldTexts.length > 0 ? (
            <div key={`${projectData.id}_${index}`} className='contents'>
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
          ) : (
            <Typography key={`${projectData.id}_${index}`} variant='caption' className='text text__plain' gutterBottom>
              {text}
            </Typography>
          );
        })}
      </div>
    </section>
  );
}

export default SubListItem;
