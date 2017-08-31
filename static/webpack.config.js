"use strict";
exports.__esModule = true;
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var joinDir = function (p) { return path.join(__dirname, p); };
var config = {
    entry: [hotMiddlewareScript, joinDir("../src/app.ts")],
    output: {
        path: joinDir("../dist"),
        publicPath: '/',
        filename: 'js/app.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: joinDir("../src/index.html"),
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                use: 'ts-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
            }
        ]
    }
};
exports["default"] = config;
