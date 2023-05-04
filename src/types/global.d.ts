// https://bobbyhadz.com/blog/typescript-make-types-global
// To declare global types in TypeScript:

// Create a global.d.ts file and declare types in the global namespace.
// Add types or interfaces that need to be globally accessible.
// Make the file a module by using export {}.
export {};

declare global {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    [key: string]: string | undefined;
  }
  interface NotionData {
    id: string;
    icon: NotionIcon;
    properties: NotionProperties;
  }

  interface NotionPageIcon {
    type: 'file';
    file: NotionFile;
  }

  interface NotionFile {
    url: string;
    expiry_time: string;
  }

  interface NotionProperties {
    id: string;
    name: NotionTitleName;
    period: NotionDate;
    role: NotionSelect;
    department: NotionText;
    company: NotionRelation;
    explain: NotionText;
    result: NotionText;
    stack: NotionMultiSelect;
    numberOfParticipants: NotionNumber;
  }

  interface CompanyQuery {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    period: string;
    role: string;
    department: string;
  }
  interface ProjectQuery {
    id: string;
    companyId: string;
    name: string;
    period: string;
    stacks: SelectProperty[];
    explain: string;
    contents: string[];
    numberOfParticipants: number;
  }
  interface NotionDefaultProperties {
    id: string;
    type: string;
  }

  interface NotionDate extends NotionDefaultProperties {
    type: 'date';
    date: {
      start: string;
      end: string;
      time_zone: string;
    };
  }

  interface NotionRelation extends NotionDefaultProperties {
    type: 'relation';
    relation: Relation[];
  }

  interface Relation {
    id: string;
  }

  interface NotionText extends NotionDefaultProperties {
    type: 'rich_text';
    rich_text: RichText[];
  }

  interface RichText {
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    href: null | string;
    plain_text: string;
    text: TextProperty;
    type: 'text';
  }

  interface TextProperty {
    content: string;
    link: null | string;
  }

  interface NotionSelect extends NotionDefaultProperties {
    type: 'select';
    select: SelectProperty;
    multi_select: SelectProperty[];
  }

  interface SelectProperty {
    id: string;
    name: string;
    color: string;
  }

  interface NotionTitleName extends NotionDefaultProperties {
    type: 'title';
    title: RichText[];
  }

  interface NotionNumber extends NotionDefaultProperties {
    type: 'number';
    number: number;
  }

  interface CustomChip {
    selected?: boolean;
    color: string;
    label: string;
    clickable: boolean;
    parentFunction?: (label: string) => void;
  }
}
