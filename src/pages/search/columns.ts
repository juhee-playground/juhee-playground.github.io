export type TSearchColumnId =
  | 'name'
  | 'domain'
  | 'keywords'
  | 'role'
  | 'summary'
  | 'hero'
  | 'keyContributions'
  | 'problem'
  | 'impact'
  | 'architecture'
  | 'numberOfParticipants'
  | 'participationRate'
  | 'techStack'
  | 'mainSkills'
  | 'companyId'
  | 'period'
  | 'description'
  | 'details'
  | 'background';

export type TSearchCellKind = 'text' | 'tags' | 'number' | 'link';

export interface ISearchColumn {
  readonly id: TSearchColumnId;
  readonly label: string;
  readonly kind: TSearchCellKind;
  readonly sticky?: boolean;
  readonly defaultVisible: boolean;
  readonly minWidth: string;
}

// 제외: url, slug, skills, solution, keyFeatures, mainWork, result
export const SEARCH_COLUMNS: readonly ISearchColumn[] = [
  { id: 'name', label: 'name', kind: 'text', sticky: true, defaultVisible: true, minWidth: '180px' },
  { id: 'domain', label: 'domain', kind: 'tags', defaultVisible: true, minWidth: '160px' },
  { id: 'keywords', label: 'keywords', kind: 'tags', defaultVisible: true, minWidth: '220px' },
  { id: 'role', label: 'role', kind: 'text', defaultVisible: true, minWidth: '140px' },
  { id: 'summary', label: 'summary', kind: 'text', defaultVisible: true, minWidth: '240px' },
  { id: 'hero', label: 'hero', kind: 'text', defaultVisible: true, minWidth: '240px' },
  { id: 'keyContributions', label: 'keyContributions', kind: 'text', defaultVisible: true, minWidth: '240px' },
  { id: 'problem', label: 'problem', kind: 'text', defaultVisible: true, minWidth: '260px' },
  { id: 'impact', label: 'impact', kind: 'text', defaultVisible: true, minWidth: '240px' },
  { id: 'architecture', label: 'architecture', kind: 'text', defaultVisible: true, minWidth: '240px' },
  { id: 'numberOfParticipants', label: 'participants', kind: 'number', defaultVisible: true, minWidth: '100px' },
  { id: 'participationRate', label: 'participationRate', kind: 'number', defaultVisible: true, minWidth: '120px' },
  { id: 'techStack', label: 'techStack', kind: 'tags', defaultVisible: true, minWidth: '180px' },
  { id: 'mainSkills', label: 'mainSkill', kind: 'tags', defaultVisible: true, minWidth: '140px' },
  { id: 'companyId', label: 'company', kind: 'text', defaultVisible: true, minWidth: '140px' },
  { id: 'period', label: 'period', kind: 'text', defaultVisible: true, minWidth: '150px' },
  { id: 'description', label: 'description', kind: 'text', defaultVisible: false, minWidth: '240px' },
  { id: 'details', label: 'details', kind: 'text', defaultVisible: false, minWidth: '240px' },
  { id: 'background', label: 'background', kind: 'text', defaultVisible: false, minWidth: '240px' },
] as const;

export const DEFAULT_VISIBLE_COLUMN_IDS: readonly TSearchColumnId[] = SEARCH_COLUMNS.filter(
  column => column.defaultVisible,
).map(column => column.id);
