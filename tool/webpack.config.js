"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";
var isProduction = process.env.NODE_ENV === "production";
var commonsEntry = [];
if (!isProduction) {
    commonsEntry.unshift(hotMiddlewareScript);
}
var joinDir = function (p) { return path.join(__dirname, p); };
console.log("WebPack build in " + process.env.NODE_ENV + " ...");
var proPlugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }),
];
var devPlugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("development")
        }
    }),
    new webpack.HotModuleReplacementPlugin(),
];
var currentPlugins = isProduction ? proPlugins : devPlugins;
var config = {
    entry: __spreadArrays(commonsEntry, [joinDir("../src/app.tsx")]),
    output: {
        path: joinDir("../dist"),
        publicPath: "./",
        filename: "js/[name].[hash].js",
        chunkFilename: "js/[name].[hash].chunk.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"],
        alias: {
            common: joinDir("../src/common")
        }
    },
    plugins: currentPlugins.concat([
        new HtmlWebpackPlugin({
            template: joinDir("../src/index.html"),
            filename: "index.html"
        }),
        new webpack.DllReferencePlugin({
            context: joinDir("../dist/build"),
            manifest: require("../dist/build/bundle.manifest.json")
        }),
        new webpack.NoEmitOnErrorsPlugin(),
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
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: "url-loader?limit=10000&name=images/[hash:8].[name].[ext]"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
        ]
    }
};
exports["default"] = config;
