// https://bobbyhadz.com/blog/typescript-make-types-global
// To declare global types in TypeScript:

// Create a global.d.ts file and declare types in the global namespace.
// Add types or interfaces that need to be globally accessible.
// Make the file a module by using export {}.
export {};

declare global {
  type TModeType = 'light' | 'dark';
  type TProjectProperties = 'rich_text' | number | 'date' | 'select' | 'text' | 'title' | 'select';
  type TAnchor = 'top' | 'left' | 'bottom' | 'right';
  type TErrorType = 'success' | 'warning' | 'error' | 'info';
  type TLanguage = 'ko' | 'en';
  type TFilterSelected = string[];

  interface IProcess {
    env: IProcessEnv;
  }

  interface IProcessEnv {
    [key: string]: string | undefined;
  }

  interface INotionData {
    id: string;
    icon: NotionIcon;
    properties: ICompanyProperties & IProjectProperties;
  }

  interface INotionPageIcon {
    type: 'file';
    file: INotionFile;
  }

  interface INotionFile {
    url: string;
    expiry_time: string;
  }
  interface INotionURL {
    id: string;
    type: 'url';
    url: string;
  }
  interface IProjectProperties {
    id: string;
    period: INotionDate;
    company: INotionRelation;
    url: INotionURL;
    role: INotionText;
    description: INotionText;
    experience: INotionText;
    skill: INotionMultiSelect;
    keywords?: INotionMultiSelect;
    numberOfParticipants: INotionNumber;
    asls: INotionText;
    challenge: INotionText;
    tobe: INotionText;
    mainSkill: INotionMultiSelect;
    summary?: INotionText;
    problem?: INotionText;
    solution?: INotionText;
    impact?: INotionText;
    architecture?: INotionText;
    keyFeatures?: INotionText;
    techStack?: INotionMultiSelect;
    slug?: INotionText;
    name: INotionTitleName;
  }

  interface ICompanyProperties {
    order: INotionNumber;
    period: INotionDate;
    type: INotionText;
    year: INotionNumber;
    description: INotionText;
    scale: INotionText;
    role: INotionSelect;
    department: INotionText;
    name: INotionTitleName;
    id: string;
  }

  interface ICompanyQuery {
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

  interface IProjectQuery {
    // [x: string]: any;
    id: string;
    companyId: string;
    name: string;
    period: string;
    stacks: ISelectProperty[];
    explain: string;
    contents: string[];
    numberOfParticipants: number;
    url: string | null;
  }
  interface INotionDefaultProperties {
    id: string;
    type: TProjectProperties;
  }

  interface IPeriodDate {
    start: string;
    end: string;
    time_zone: string | null;
  }

  interface INotionData extends INotionDefaultProperties {
    date: IPeriodDate;
  }

  interface INotionRelation extends INotionDefaultProperties {
    type: 'relation';
    relation: IRelation[];
  }

  interface IRelation {
    id: string;
  }

  interface INotionText extends INotionDefaultProperties {
    rich_text: IRichText[];
  }

  interface IRichText {
    type: TProjectProperties;
    text: ITextProperty;
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: null;
  }

  interface ITextProperty {
    content: string;
    link: null | string;
  }

  interface INotionTextField {
    rich_text?: IRichText[];
    title?: IRichText[];
  }

  interface INotionSelect extends INotionDefaultProperties {
    select: ISelectProperty;
  }

  interface INotionSelectOptions {
    id: string;
    name: string;
    type: 'multi_select';
    multi_select: {
      options: ISelectProperty[];
    };
  }
  interface ISelectProperty {
    id: string;
    name: string;
    color: string;
  }

  interface INotionTitleName extends INotionDefaultProperties {
    title: IRichText[];
  }

  interface INotionNumber extends INotionDefaultProperties {
    number: number;
  }

  interface ICustomChip {
    selectedItems?: string[];
    pointColor?: string;
    color?: string;
    size?: OverridableStringUnion<'small' | 'medium', ChipPropsSizeOverrides>;
    label: string;
    clickable?: boolean;
    handleChipSelect?: (label: string) => void;
  }

  interface IToggleChipProps {
    pointColor?: string;
    checked: boolean;
    color?: string;
    size?: OverridableStringUnion<'small' | 'medium', ChipPropsSizeOverrides>;
    label: string;
    clickable?: boolean;
    handleChipSelect?: (label: string) => void;
  }

  interface ICompanyData {
    id: string;
    name: string;
    description: string[];
    type: string;
    startDate: string;       // raw: "2025-02-03"
    endDate: string | null;  // raw: "2025-12-31" | null (재직중)
    year: number;
    scale: string;
    department: string;
    role: string;
    period: string;
    order: number;
  }

  interface IProjectData {
    id: string;
    slug: string;
    companyId: string;
    name: string;
    period: string;
    techStack: string[];
    techStackOptions: ISelectProperty[];
    summary: string;
    problem: string;
    solution: string;
    impact: string;
    architecture: string;
    keyFeatures: string;
    mainSkills: ISelectProperty[];
    skills: ISelectProperty[];
    role: string;
    description: string;
    asls: IRichText[];
    challenge: IRichText[];
    tobe: IRichText[];
    experience: IRichText[];
    numberOfParticipants: number;
    url: string;
  }

  interface ICardListProps {
    key: string;
    info: ICompanyData;
    subInfo: IProjectData[];
    filters: TFilterSelected;
    isLastCompany: boolean;
  }

  interface ISubListProps {
    key: string | number;
    filters: TFilterSelected;
    info: IProjectData;
  }

  interface INavInfoItems {
    icon: string;
    title: string;
    isBasic: boolean;
    basic?: IMultilangText[];
    isSubTitle: boolean;
    subTitle?: ISubTitleItem[];
    isSpaceBetween: boolean;
    spaceBetween?: IDateItem[];
  }

  interface ISubTitleItem {
    subTitle: string;
    value: string;
    icon?: string;
  }

  interface IDateItem {
    text: IMultilangText;
    date: string;
  }

  interface ISnackBarProps {
    message: string;
    type: TErrorType;
    isOpen: boolean;
  }

  interface ITask {
    name: string;
    startDate: string;
    endDate: string;
    color?: string;
  }

  interface IPieData {
    id: string;
    label: string;
    value: number;
    color: string;
  }

  interface IMultilangText {
    ko: string;
    en: string;
  }

interface IButtonProps {
  label?: string;
  onClick: () => void;
  className?: string;
  type?: 'circle' | 'dpad' | 'pill';
  direction?: 'up' | 'down' | 'left' | 'right';
}

}
