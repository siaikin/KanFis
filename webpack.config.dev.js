const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        popup: './js/popup/popup.js',
        background: './js/background/background.js',
        content: './js/content/content.js',
        option: './js/option/option.js'
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, 'extension')
    },
    // devServer: {
    //     contentBase: './dist'
    // },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./popup.html",
            filename: "popup.html",
            chunks: ['popup']
        }),
        new htmlWebpackPlugin({
            template: "./option.html",
            filename: "option.html",
            chunks: ['option']
        }),
        new ExtractTextPlugin('styles.css')
    ]
};

