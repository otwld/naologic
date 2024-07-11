import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../*.mdx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  refs: (config, { configType }) => ({
    kit: {
      title: 'Theme',
      url:
        configType === 'DEVELOPMENT'
          ? 'http://localhost:4401'
          : 'https://668fa2dc350ece4f4da6f888.chromatic.com/',
    },
    theme: {
      title: 'Kit',
      url:
        configType === 'DEVELOPMENT'
          ? 'http://localhost:4402'
          : 'https://668fa22850553b4d3c2ae719.chromatic.com/',
    },
  }),
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
