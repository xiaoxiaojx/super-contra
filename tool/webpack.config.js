"use strict";
exports.__esModule = true;
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";
var joinDir = function (p) { return path.join(__dirname, p); };
console.log("WebPack build in " + process.env.NODE_ENV + " ...");
var proPlugins = [
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    }),
];
var devPlugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: "\"development\""
        }
    })
];
var currentPlugins = process.env.NODE_ENV === "production" ? proPlugins : devPlugins;
var config = {
    entry: [hotMiddlewareScript, joinDir("../src/app.tsx")],
    output: {
        path: joinDir("../dist"),
        publicPath: "./",
        filename: "js/[name].[hash].js",
        chunkFilename: "js/[name].[hash].chunk.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"]
    },
    plugins: currentPlugins.concat([
        new HtmlWebpackPlugin({
            template: joinDir("../src/index.html"),
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]),
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                use: "ts-loader"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"]
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
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: "url-loader?limit=10000&name=images/[hash:8].[name].[ext]"
            }, {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    }
};
exports["default"] = config;
