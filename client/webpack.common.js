const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// html files
const shilledLanguagesTemplateHTML = fs.readFileSync(
  'src/components/shilledLanguageBarItem/template.html',
  'utf-8'
);
const threadInfoHTML = fs.readFileSync(
  'src/components/threadInfo/template.html',
  'utf-8'
);
const homePageHTML = fs.readFileSync('src/pages/home/template.html', 'utf-8');

const shilledLanguageBarGraphHTML = fs.readFileSync(
  'src/components/shilledLanguageBarGraph/template.html',
  'utf-8'
);

const threadPostsHTML = fs.readFileSync(
  'src/components/threadPosts/template.html',
  'utf-8'
);

const threadPostHTML = fs.readFileSync(
  'src/components/threadPost/template.html',
  'utf-8'
);

const threadsHTML = fs.readFileSync(
  'src/components/threads/baseThreadsComponent/template.html',
  'utf-8'
);

const dptStatsHTML = fs.readFileSync(
  'src/components/dpt-stats/template.html',
  'utf-8'
);

module.exports = {
  entry: {
    app: './main.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.DefinePlugin({
      shilledLanguagesTemplate: JSON.stringify(shilledLanguagesTemplateHTML),
      threadInfoTemplate: JSON.stringify(threadInfoHTML),
      homePageTemplate: JSON.stringify(homePageHTML),
      shilledLanguageBarGraphTemplate: JSON.stringify(
        shilledLanguageBarGraphHTML
      ),
      threadPostsTemplate: JSON.stringify(threadPostsHTML),
      threadPostTemplate: JSON.stringify(threadPostHTML),
      threadsTemplate: JSON.stringify(threadsHTML),
      dptStatsTemplate: JSON.stringify(dptStatsHTML)
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: path.resolve('node_modules'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env']]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
