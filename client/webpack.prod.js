const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    app: './main.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      apiURL: JSON.stringify('https://4chandptstats.com')
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle-[contentHash].js'
  }
});
