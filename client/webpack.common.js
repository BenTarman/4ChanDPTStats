const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const someFileContents = fs.readFileSync('src/components/shilledLanguages/shilledLanguages.html', "utf-8");
console.log(someFileContents)

module.exports = {
    entry: {
        app: './main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './templates/app.html',
        }),
        new webpack.DefinePlugin({
            'somevar': JSON.stringify(someFileContents)
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
