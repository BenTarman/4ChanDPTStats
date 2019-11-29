const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// html files
const shilledLanguagesTemplateHTML = fs.readFileSync('src/components/shilledLanguages/template.html', "utf-8");
const threadInfoHTML = fs.readFileSync('src/components/threadInfo/template.html', "utf-8");

module.exports = {
    entry: {
        app: './main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new webpack.DefinePlugin({
            'shilledLanguagesTemplate': JSON.stringify(shilledLanguagesTemplateHTML),
            'threadInfoTemplate': JSON.stringify(threadInfoHTML)
          })
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: path.resolve('node_modules'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}
