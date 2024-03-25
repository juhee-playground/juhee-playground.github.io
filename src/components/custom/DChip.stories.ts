import type { Meta, StoryObj } from '@storybook/react';

import DChip from './DChip';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Chip',
  component: DChip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip의 이름을 설정해주는 역할을 합니다.',
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
    selected: {
      control: 'boolean',
      description: 'Chip에 체크 표시가 되었는지를 알려주는 역할을 합니다.',
    },
    clickable: {
      control: 'boolean',
      description: 'Chip 클릭을 할 수 있는지 없는지 알려주는 역할을 합니다.',
    },
  },
} satisfies Meta<typeof DChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallChip: Story = {
  args: {
    label: 'Small Chip',
    color: 'blue',
    size: 'small',
    clickable: false,
    selected: true,
  },
};

export const MediumChip: Story = {
  args: {
    label: 'Medium Chip',
    color: 'blue',
    size: 'medium',
    clickable: false,
    selected: true,
  },
};

export const Selected: Story = {
  args: {
    label: 'Selected Chip',
    color: 'orange',
    size: 'medium',
    clickable: false,
    selected: true,
  },
};

export const NotSelected: Story = {
  args: {
    label: 'Not Selected Chip',
    color: 'orange',
    size: 'medium',
    clickable: false,
    selected: false,
  },
};

export const RedChip: Story = {
  args: {
    label: 'Red Chip',
    color: 'red',
    size: 'medium',
    clickable: false,
    selected: true,
  },
};
