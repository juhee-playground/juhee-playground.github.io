import dayjs from 'dayjs';

const COUNT_OF_MONTH = 12;

export function parserPeriod(start: string, end: string | null): string {
  const endDate = end ?? dayjs().format('YYYY-MM-DD');
  const year = dayjs(endDate).diff(start, 'year');
  const month = dayjs(endDate).diff(start, 'month');
  const numberOfMonths = month - year * COUNT_OF_MONTH;

  return `(${[`${year}년`, `${numberOfMonths}개월`].filter(dateItem => !/^0/.test(dateItem)).join(' ')})`;
}

export const parseCompanyData = (info: ICompanyProperties) => {
  const date = info.period?.date;
  const start = date?.start ?? '';
  const end = date?.end ?? null;

  return {
    id: info.id,
    name: info.name?.title?.[0]?.plain_text || '',
    description: info.description?.rich_text?.[0]?.plain_text.split('- ') || [],
    type: info.type?.rich_text?.[0]?.plain_text || '',
    startDate: start,
    endDate: end,
    year: info.year?.number || 0,
    scale: info.scale?.rich_text?.[0]?.plain_text || '',
    department: info.department?.rich_text?.[0]?.plain_text || '',
    role: info.role?.select?.name || '',
    period: start ? parserPeriod(start, end) : '',
    order: info.order?.number || 0,
  };
};
export const parseProjectData = (info: IProjectProperties) => {
  const date = info.period?.date;
  return {
    id: info.id,
    companyId: info.company?.relation?.[0]?.id || '',
    name: info.name?.title?.[0]?.plain_text || '',
    period: date?.start ? `${date.start}~${date.end ?? ''}` : '',
    mainSkills: Array.isArray(info.mainSkill?.multi_select) ? info.mainSkill.multi_select : [],
    skills: Array.isArray(info.skill?.multi_select) ? info.skill.multi_select : [],
    role: info.role?.rich_text?.[0]?.plain_text || '',
    description: info.description?.rich_text?.[0]?.plain_text || '',
    asls: Array.isArray(info.asls?.rich_text) ? info.asls.rich_text : [],
    challenge: Array.isArray(info.challenge?.rich_text) ? info.challenge.rich_text : [],
    tobe: Array.isArray(info.tobe?.rich_text) ? info.tobe.rich_text : [],
    experience: Array.isArray(info.experience?.rich_text) ? info.experience.rich_text : [],
    numberOfParticipants: typeof info.numberOfParticipants?.number === 'number' ? info.numberOfParticipants.number : 0,
    url: info.url?.url || '',
  };
};
