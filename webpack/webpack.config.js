"use strict";
exports.__esModule = true;
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var joinDir = function (p) { return path.join(__dirname, p); };
var config = {
    entry: joinDir("../src/app.tsx"),
    output: {
        path: joinDir("../dist"),
        filename: 'js/app.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: joinDir("../src/index.html"),
            filename: "index.html"
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                use: 'ts-loader'
            },
            {
                test: /\.(tsx|ts|js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            }
        ]
    }
};
exports["default"] = config;
