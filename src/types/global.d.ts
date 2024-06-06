// https://bobbyhadz.com/blog/typescript-make-types-global
// To declare global types in TypeScript:

// Create a global.d.ts file and declare types in the global namespace.
// Add types or interfaces that need to be globally accessible.
// Make the file a module by using export {}.
export {};

declare global {
  type TModeType = 'light' | 'dark';
  type TProjectProperties = 'rich_text' | number | 'date' | 'select' | 'text' | 'title' | 'select';

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
    mainSkill: INotionMultiSelect;
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

  type TFilterSelected = string[];

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

  interface ICardListProps {
    key: string;
    info: ICompanyProperties;
    subInfo: IProjectProperties[];
    filters: TFilterSelected;
    isLastCompany: boolean;
  }

  interface ISubListProps {
    key: string | number;
    filters: TFilterSelected;
    info: IProjectProperties;
  }

  interface INavInfoItems {
    icon: string;
    title: string;
    isBasic: boolean;
    basic?: string[];
    isSubTitle: boolean;
    subTitle?: ISubTitleItem[];
    isSpaceBetween: boolean;
    spaceBetween?: IDateItem[];
  }

  interface INavProfileProps {
    info: INavInfoItems;
    key: string;
  }

  type TErrorType = 'success' | 'warning' | 'error' | 'info';

  interface ISnackBarProps {
    message: string;
    type: TErrorType;
    isOpen: boolean;
  }

  interface ISubTitleItem {
    subTitle: string;
    value: string;
    icon?: string;
  }

  interface IDateItem {
    text: string;
    date: string;
  }
}
