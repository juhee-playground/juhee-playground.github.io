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
    name: 'OHCOACH Ultimate',
    period: '2020.01 ~ 2022.11',
    borderType: 'typescript',
    description: '축구 데이터를 시각화하여 데이터를 효과적으로 전달하여 업무 효율을 높이는 서비스.',
    mainSkill: ['React','Typescript'],
    skill: [{name: 'mysql', color: 'red', id: '1'}, {name: 'D3', color: 'orange', id: '2'} ],
    keywords: [{ name: '데이터시각화', color: 'grey', id: '1' }, { name: 'd3', color: 'grey', id: '2'}, {name: 'Chart', color: 'grey', id: '3'}, {name: '기획팀 역제안', color: 'grey', id: '4'}, {name: 'pdf 기능', color: 'grey', id: '5'}, {name: '리펙토링', color: 'grey', id: '6'} ],
  },
};
