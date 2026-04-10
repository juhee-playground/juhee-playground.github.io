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
  const raw = info as unknown as {
    id?: string;
    slug?: string;
    companyId?: string;
    company?: string;
    name?: string;
    period?: string;
    techStack?: string[];
    role?: string;
    summary?: string;
    problem?: string;
    solution?: string;
    impact?: string;
    numberOfParticipants?: number;
    url?: string;
  };
  const date = info.period?.date;
  const getRichTextValue = (field?: INotionText) => {
    if (!Array.isArray(field?.rich_text)) return '';
    return field.rich_text.map(item => item.plain_text).join('\n');
  };

  const notionMainSkills = Array.isArray(info.mainSkill?.multi_select) ? info.mainSkill.multi_select : [];
  const notionSkills = Array.isArray(info.skill?.multi_select) ? info.skill.multi_select : [];
  const notionTechStack = Array.isArray(info.techStack?.multi_select) ? info.techStack.multi_select : [];
  const techStackOptionMap = new Map<string, ISelectProperty>();

  [...notionTechStack, ...notionMainSkills, ...notionSkills].forEach(select => {
    if (!techStackOptionMap.has(select.name)) {
      techStackOptionMap.set(select.name, select);
    }
  });

  (Array.isArray(raw.techStack) ? raw.techStack : []).forEach((name, index) => {
    if (!techStackOptionMap.has(name)) {
      techStackOptionMap.set(name, {
        id: `raw-tech-${index}-${name}`,
        name,
        color: 'default',
      });
    }
  });

  const techStackOptions = Array.from(techStackOptionMap.values());
  const mergedTechStack = [
    ...new Set(techStackOptions.map(select => select.name)),
  ];

  return {
    id: info.id || raw.id || '',
    slug: getRichTextValue(info.slug) || raw.slug || '',
    companyId: info.company?.relation?.[0]?.id || raw.companyId || raw.company || '',
    name: info.name?.title?.[0]?.plain_text || raw.name || '',
    period: date?.start ? `${date.start}~${date.end ?? ''}` : raw.period || '',
    techStack: mergedTechStack,
    techStackOptions,
    summary: getRichTextValue(info.summary) || getRichTextValue(info.description) || raw.summary || '',
    problem: getRichTextValue(info.problem) || getRichTextValue(info.asls) || raw.problem || '',
    solution: getRichTextValue(info.solution) || getRichTextValue(info.challenge) || raw.solution || '',
    impact: getRichTextValue(info.impact) || getRichTextValue(info.tobe) || raw.impact || '',
    mainSkills: notionMainSkills,
    skills: notionSkills,
    role: info.role?.rich_text?.[0]?.plain_text || raw.role || '',
    description: getRichTextValue(info.description) || raw.summary || '',
    asls: Array.isArray(info.asls?.rich_text) ? info.asls.rich_text : [],
    challenge: Array.isArray(info.challenge?.rich_text) ? info.challenge.rich_text : [],
    tobe: Array.isArray(info.tobe?.rich_text) ? info.tobe.rich_text : [],
    experience: Array.isArray(info.experience?.rich_text) ? info.experience.rich_text : [],
    numberOfParticipants:
      typeof info.numberOfParticipants?.number === 'number'
        ? info.numberOfParticipants.number
        : typeof raw.numberOfParticipants === 'number'
          ? raw.numberOfParticipants
          : 0,
    url: info.url?.url || raw.url || '',
  };
};
