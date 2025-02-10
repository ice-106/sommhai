module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugins: [
    //   [
    //     'module-resolver',
    //     {
    //       root: ['./'],
    //       alias: {
    //         '@app': './src',
    //         '@assets': './assets',
    //         '@components': './src/components',
    //         '@constants': './src/constants',
    //         '@hooks': './src/hooks',
    //         '@navigation': './src/navigation',
    //         '@screens': './src/screens',
    //         '@services': './src/services',
    //         '@utils': './src/utils',
    //       },
    //     },
    //   ],
    // ],
  };
};
