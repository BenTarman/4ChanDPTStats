const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common,{
    mode: 'production',
    entry: {
        app: './main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle-[contentHash].js'
    },
});
