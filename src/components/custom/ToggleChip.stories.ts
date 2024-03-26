import type { Meta, StoryObj } from '@storybook/react';

import ToggleChip from './ToggleChip';

const meta = {
  title: 'Components/ToggleChip',
  component: ToggleChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip의 이름을 설정해주는 역할을 합니다.',
    },
    selected: {
      control: 'boolean',
      description: 'Chip에 체크 표시가 되었는지를 알려주는 역할을 합니다.',
    },
    clickable: {
      control: 'none',
      description: 'Chip 클릭을 할 수 있는지 없는지 알려주는 역할을 합니다.',
      defaultValue: true,
    },
    pointColor: {
      control: 'none',
      description: '말그래도 포인트컬러값 입니다. 부모에서만 바꿀 수 있습니다.',
    },
    handleChipSelect: {
      control: 'function',
      description: 'Chip을 클릭하면 자신의 라벨이 부모에게 넘겨주는 역활을 합니다.',
    },
  },
} satisfies Meta<typeof ToggleChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    label: 'Selected Chip',
    selected: true,
    color: '#8c538d',
  },
};

export const NotSelected: Story = {
  args: {
    label: 'Not Selected Chip',
    selected: false,
    color: '',
  },
};
