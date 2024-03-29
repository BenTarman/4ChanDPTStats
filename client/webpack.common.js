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

const aboutPageHTML = fs.readFileSync('src/pages/about/template.html', 'utf-8');

const historyPageHTML = fs.readFileSync(
  'src/pages/history/template.html',
  'utf-8'
);

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

const threadFiltersHTML = fs.readFileSync(
  'src/components/thread-filters/template.html',
  'utf-8'
);

const threadSelectHTML = fs.readFileSync(
  'src/components/thread-select/template.html',
  'utf-8'
);

const threadTypeSelectHTML = fs.readFileSync(
  'src/components/thread-type-select/template.html',
  'utf-8'
);

const sortGraphDropdownHTML = fs.readFileSync(
  'src/components/sort-graph-dropdown/template.html',
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
      aboutPageTemplate: JSON.stringify(aboutPageHTML),
      historyPageTemplate: JSON.stringify(historyPageHTML),
      shilledLanguageBarGraphTemplate: JSON.stringify(
        shilledLanguageBarGraphHTML
      ),
      threadPostsTemplate: JSON.stringify(threadPostsHTML),
      threadPostTemplate: JSON.stringify(threadPostHTML),
      threadsTemplate: JSON.stringify(threadsHTML),
      dptStatsTemplate: JSON.stringify(dptStatsHTML),
      threadFiltersTemplate: JSON.stringify(threadFiltersHTML),
      threadSelectTemplate: JSON.stringify(threadSelectHTML),
      threadTypeSelectTemplate: JSON.stringify(threadTypeSelectHTML),
      sortGraphDropdownTemplate: JSON.stringify(sortGraphDropdownHTML)
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
