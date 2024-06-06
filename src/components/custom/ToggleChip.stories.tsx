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
      defaultValue: 'Chip',
    },
    pointColor: {
      description: '말그래도 포인트컬러값 입니다. 부모에서만 바꿀 수 있습니다.',
    },
    handleChipSelect: {
      description: 'Chip을 클릭하면 자신의 라벨이 부모에게 넘겨주는 역활을 합니다.',
    },
  },
} satisfies Meta<typeof ToggleChip>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const PlayGround: TStory = {
  args: {
    label: 'toggle',
    pointColor: 'orange',
    checked: true,
  },
};
