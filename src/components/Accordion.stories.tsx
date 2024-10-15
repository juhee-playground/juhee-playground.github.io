import type { Meta, StoryObj } from '@storybook/react';

import Accordion from './Accordion';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'components/Accordion',
  component: Accordion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'accordion open toggle text',
      defaultValue: 'Please wait. Loading products',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Playground: TStory = {
  args: {
    title: 'accordion open toggle text',
    children: <p>This is the content for section 1.</p>,
  },
};
