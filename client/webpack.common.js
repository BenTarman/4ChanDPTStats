const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './main.js'
    },
    plugins: [new HtmlWebpackPlugin({
        template: './templates/template.html',
    })],
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
