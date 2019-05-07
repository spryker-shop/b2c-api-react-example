require('ignore-styles');

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/env', '@babel/typescript', '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: 'src',
          '@constants': './src/constants',
          '@application': './src/application',
          '@helpers': './src/helpers',
          '@interfaces': './src/interfaces',
          '@stores': './src/stores',
          '@services': './src/services',
          '@configs': './src/configs',
          '@translation': './src/translation',
          '@theme': './src/theme',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
  extensions: ['.ts', '.tsx'],
});

require('./index');
