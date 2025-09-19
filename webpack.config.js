const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Override the default HTML template
  config.plugins = config.plugins.map(plugin => {
    if (plugin.constructor.name === 'HtmlWebpackPlugin') {
      plugin.options.template = './web/index.html';
    }
    return plugin;
  });
  
  return config;
};
