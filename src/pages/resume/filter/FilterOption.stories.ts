import type { Meta, StoryObj } from '@storybook/react';

import FilterOption from './FilterOption';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'pages/resume/filter/FilterOption',
  component: FilterOption,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '필터의 이름을 설정해주는 역할을 합니다.',
      defaultValue: 'Color',
    },
    options: {
      control: 'object',
      description: '나타낼 chip의 리스트를 나타냅니다.',
      options: ['red', 'purple', 'yellow', 'orange', 'blueGrey', 'pink', 'cyan', 'green', 'blue', 'brown', 'default'],
    },
    colorOptions: {
      control: "object",
      description: 'chip의 색을 지정해주는 역활.',
      options: [{ id: '1', name: 'javascript', color: 'yellow', }, { id: '2', name: 'typescript', color: 'blue', }, { id: '3', name: 'Vue', color: 'green', }]
    },
    pointColor: {
      control: 'color',
      description: 'chip의 컬러를 표시합니다.',
    },
    selected: {
      control: 'object',
      description: '선택된 칩이 리스트를 나타냅니다..',
    },
  },
} satisfies Meta<typeof FilterOption>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const ToggleChip: TStory = {
  args: {
    title: 'Color',
    options: ['red', 'purple', 'yellow', 'orange', 'blueGrey', 'pink', 'cyan', 'green', 'blue'],
    pointColor: 'red',
    selected: ['red', 'purple', 'yellow', 'orange', 'blueGrey', 'pink', 'cyan', 'green', 'blue'],
    onChange: () => {}
  },
};

export const CustonChip: TStory = {
  args: {
    title: 'Skill',
    options: ['javascript', 'Vue', 'typescript'],
    colorOptions: [{ id: '1', name: 'javascript', color: 'yellow', }, { id: '2', name: 'typescript', color: 'blue', }, { id: '3', name: 'Vue', color: 'green', }],
    selected: ['javascript', 'Vue', 'typescript'],
    onChange: () => {}
  },
};
