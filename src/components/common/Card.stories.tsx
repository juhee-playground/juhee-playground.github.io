import type { Meta, StoryObj } from '@storybook/react';

import ReactIcon from '@/assets/icon/React.svg';

import Card from './Card';

const meta = {
  title: 'components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the character',
      defaultValue: 'React',
    },
    count: {
      control: 'number',
      description: 'count on number',
      defaultValue: '4',
    },
    image: {
      control: 'text',
      description: 'The image URL or path for the character',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Playground: TStory = {
  args: {
    image: ReactIcon,
    name: 'React',
    count: 4,
  },
};
