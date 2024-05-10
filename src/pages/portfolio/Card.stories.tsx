import type { Meta, StoryObj } from '@storybook/react';

import ProjectCard from './Card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'pages/portfolio/ProjectCard',
  component: ProjectCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    mainSkills: [{ name: 'vue', color: 'green', }, { name: 'javascript', color: 'yellow'}],
    skills: [{ name: 'd3' }, { name: 'highcharts.js'}, {name: 'Vuex'}],
  },
};
