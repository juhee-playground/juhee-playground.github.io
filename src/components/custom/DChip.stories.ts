import DChip from './DChip';

import type { Meta, StoryObj } from '@storybook/react';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Chip',
  component: DChip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/TStory-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip의 이름을 설정해주는 역할을 합니다.',
      defaultValue: 'Chip',
    },
    color: {
      control: 'select',
      description: 'Chip의 색깔을 결정해주는 역활을 합니다.',
      options: ['red', 'purple', 'yellow', 'orange', 'blueGrey', 'pink', 'cyan', 'green', 'blue', 'brown', 'default'],
    },
    size: {
      control: 'radio',
      description: 'Chip의 사이즈를 결정해주는 역활을 합니다.',
      options: ['small', 'medium'],
    },
    clickable: {
      control: 'boolean',
      description: 'Chip 클릭을 할 수 있는지 없는지 알려주는 역할을 합니다.',
    },
    selectedItems: {
      description: '필터에 값이 있으면 체크표시가 보입니다.',
    },
  },
} satisfies Meta<typeof DChip>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Playground: TStory = {
  args: {
    label: 'chip',
    color: 'red',
    size: 'small',
    selectedItems: ['chip'],
    clickable: true,
  },
};

export const Smallhip: TStory = {
  args: {
    label: 'Small Chip',
    color: 'blue',
    size: 'small',
    selectedItems: ['Small Chip'],
    clickable: true,
  },
};

export const MediumChip: TStory = {
  args: {
    label: 'Medium Chip',
    color: 'blue',
    size: 'medium',
    selectedItems: ['Medium Chip'],
    clickable: true,
  },
};

export const Clickable: TStory = {
  args: {
    label: 'Clickeable Chip',
    color: 'orange',
    size: 'medium',
    selectedItems: ['Clickeable Chip'],
    clickable: true,
  },
};

export const NotClickableChip: TStory = {
  args: {
    label: 'Not clickable Chip',
    color: 'orange',
    size: 'medium',
    clickable: false,
  },
};
