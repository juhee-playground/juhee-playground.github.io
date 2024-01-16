// https://bobbyhadz.com/blog/typescript-make-types-global
// To declare global types in TypeScript:

// Create a global.d.ts file and declare types in the global namespace.
// Add types or interfaces that need to be globally accessible.
// Make the file a module by using export {}.
export {};

declare global {
  type ModeType = 'light' | 'dark';
  type NotionPropertiesType = 'rich_text' | number | 'date' | 'select' | 'text' | 'title' | 'select';

  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    [key: string]: string | undefined;
  }
  interface NotionData {
    id: string;
    icon: NotionIcon;
    properties: CompanyProperties & NotionProperties;
  }

  interface NotionPageIcon {
    type: 'file';
    file: NotionFile;
  }

  interface NotionFile {
    url: string;
    expiry_time: string;
  }
  interface NotionURL {
    id: string;
    type: 'url';
    url: string;
  }
  interface NotionProperties {
    id: string;
    name: NotionTitleName;
    period: NotionDate;
    company: NotionRelation;
    type: NotionNumber;
    explain: NotionText;
    result: NotionText;
    mainStack: NotionMultiSelect;
    stack: NotionMultiSelect;
    numberOfParticipants: NotionNumber;
    url: NotionURL;
  }

  interface CompanyProperties {
    order: NotionNumber;
    period: NotionDate;
    type: NotionText;
    year: NotionNumber;
    description: NotionText;
    scale: NotionText;
    role: NotionSelect;
    department: NotionText;
    name: NotionTitleName;
    id: string;
  }

  interface CompanyQuery {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    period: string;
    role: string;
    department: string;
    type: string;
    year: number;
    scale: string;
    order: number;
    description: string;
  }
  interface ProjectQuery {
    [x: string]: any;
    id: string;
    companyId: string;
    name: string;
    period: string;
    stacks: SelectProperty[];
    explain: string;
    contents: string[];
    numberOfParticipants: number;
    url: string;
  }
  interface NotionDefaultProperties {
    id: string;
    type: NotionPropertiesType;
  }

  interface PeriodDate {
    start: string;
    end: string;
    time_zone: string;
  }

  interface NotionDate extends NotionDefaultProperties {
    date: PeriodDate;
  }

  interface NotionRelation extends NotionDefaultProperties {
    type: 'relation';
    relation: Relation[];
  }

  interface Relation {
    id: string;
  }

  interface NotionText extends NotionDefaultProperties {
    rich_text: RichText[];
  }

  interface RichText {
    type: NotionPropertiesType;
    text: TextProperty;
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: null | string;
  }

  interface TextProperty {
    content: string;
    link: null | string;
  }

  interface NotionSelect extends NotionDefaultProperties {
    select: SelectProperty;
    // multi_select?: SelectProperty[];
  }

  interface NotionSelectOptions {
    id: string;
    name: string;
    type: 'multi_select';
    multi_select: {
      options: SelectProperty[];
    };
  }
  interface SelectProperty {
    id: string;
    name: string;
    color: string;
  }

  interface NotionTitleName extends NotionDefaultProperties {
    title: RichText[];
  }

  interface NotionNumber extends NotionDefaultProperties {
    number: number;
  }

  interface FilterSelected {
    [key: string]: string[];
  }

  interface CustomChip {
    selected?: boolean;
    color: string;
    size?: OverridableStringUnion<'small' | 'medium', ChipPropsSizeOverrides>;
    label: string;
    clickable?: boolean;
    parentFunction?: (label: string) => void;
  }

  interface CardListProps {
    key: string;
    info: CompanyProperties;
    subInfo: ProjectQuery[];
    isLastCompany: boolean;
  }

  interface SubListProps {
    key: string;
    info: ProjectQuery;
  }

  interface NavInfoItems {
    icon: string;
    title: string;
    isBasic: boolean;
    basic?: string[];
    isSubTitle: boolean;
    subTitle?: SubTitleItem[];
    isSpaceBetween: boolean;
    spaceBetween?: DateItem[];
  }

  interface NavProfileProps {
    info: NavInfoItems;
    key: string;
  }

  type errorType = 'success' | 'warning' | 'error' | 'info';

  interface SnackBarProps {
    message: string;
    type: errorType;
    isOpen: boolean;
  }

  interface SubTitleItem {
    subTitle: string;
    value: string;
    icon?: string;
  }

  interface DateItem {
    text: string;
    date: string;
  }
}
