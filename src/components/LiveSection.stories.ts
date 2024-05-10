import type { Meta, StoryObj } from '@storybook/react';

import LiveSection from './LiveSection';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'components/LiveSection',
  component: LiveSection,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: '실시간 영역에 들어가는 메세지를 나타냅니다.',
      defaultValue: 'Please wait. Loading products',
    },
  },
} satisfies Meta<typeof LiveSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    message: 'Please wait. Loading products',
  },
};
