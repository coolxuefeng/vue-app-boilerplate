const webpack = require('webpack');
const appPackage = require('../package.json');
const git = require('simple-git/promise')();

const injectVersion = async (api) => {
  const commits = await git.log();
  const commitCount = commits.total;
  const version = appPackage.version.replace(/\.\d+$/, `.${commitCount}`);

  console.log('VERSION:', version);

  api.chainWebpack((config) => {
    config.plugin('versioning').use(webpack.DefinePlugin, [
      {
        APP_VERSION: JSON.stringify(version),
      },
    ]);
  });
};

module.exports = (api) => {
  api.registerCommand('serve:versioning', async (args) => {
    await injectVersion(api);
    await api.service.run('serve', args);
  });

  api.registerCommand('build:versioning', async (args) => {
    await injectVersion(api);
    await api.service.run('build', args);
  });
};

module.exports.defaultModes = {
  'serve:versioning': 'development',
  'build:versioning': 'production',
};
