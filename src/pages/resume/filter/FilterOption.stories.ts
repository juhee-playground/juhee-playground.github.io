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
    type: {
      control: 'text',
      description: '필터의 타입을 설정해주는 역할을 합니다.',
      defaultValue: 'Color',
    },
    options: {
      control: 'array',
      description: 'Chip의 색깔을 결정해주는 역활을 합니다.',
      options: ['red', 'purple', 'yellow', 'orange', 'blueGrey', 'pink', 'cyan', 'green', 'blue', 'brown', 'default'],
    },
    colorOptions: {
      control: 'radio',
      description: 'Chip의 사이즈를 결정해주는 역활을 합니다.',
      options: ['small', 'medium'],
    },
    pointColor: {
      control: 'none',
      description: 'Redux 포인트컬러',
    },
    selected: {
      control: 'none',
      description: '필터에 값이 있으면 체크표시가 보입니다.',
    },
  },
} satisfies Meta<typeof FilterOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    type: 'Color',
    options: ['red', 'purple', 'yellow', 'orange', 'blueGrey', 'pink', 'cyan', 'green', 'blue'],
    pointColor: 'red',
    selected: { color: ['red', 'purple'] },
  },
};
