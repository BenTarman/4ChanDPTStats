const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: './main.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      apiURL: JSON.stringify('http://localhost:8081')
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  }
});
