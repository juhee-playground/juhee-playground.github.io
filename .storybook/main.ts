import type { StorybookConfig } from '@storybook/react-vite';
const path = require('path');
const { mergeConfig } = require('vite');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        postcss: null,
        preprocessorOptions: {
          scss: {
            additionalData: `
                        @import "${path.resolve(__dirname, '../src/styles/variables')}";
                        @import "${path.resolve(__dirname, '../src/styles/reset')}";
                        @import "${path.resolve(__dirname, '../src/styles/mediaQueries')}";
                    `,
          },
        },
      },
    });
  },
};

export default config;
