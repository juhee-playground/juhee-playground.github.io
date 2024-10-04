import Card from './Card';

import type { Meta, StoryObj } from '@storybook/react';

import ReactIcon from '@/assets/icon/React.svg';

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
      defaultValue: 'Bulbasaur',
    },
    type: {
      control: 'text',
      description: 'The type of the character (e.g., Plant, Fire, Aqua)',
      defaultValue: 'Plant',
    },
    image: {
      control: 'text',
      description: 'The image URL or path for the character',
    },
    stats: {
      control: 'object',
      description: 'An array of stats with name and value',
      defaultValue: [
        { name: 'Strength', value: 80 },
        { name: 'Speed', value: 60 },
        { name: 'Weight', value: 50 },
        { name: 'Skill', value: 70 },
      ],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Playground: TStory = {
  args: {
    image: ReactIcon,
    name: 'React',
    type: 'Plant',
    stats: [
      { name: 'Strength', value: 80 },
      { name: 'Speed', value: 60 },
      { name: 'Weight', value: 50 },
      { name: 'Skill', value: 70 },
    ],
  },
};
