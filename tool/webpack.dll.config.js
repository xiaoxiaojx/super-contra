"use strict";
exports.__esModule = true;
var webpack = require("webpack");
var path = require("path");
var joinDir = function (p) { return path.join(__dirname, p); };
var config = {
    entry: {
        bundle: [
            "react",
            "react-dom",
            "mobx-react",
            "mobx"
        ]
    },
    output: {
        path: joinDir("../dist/build"),
        filename: "[name].js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: joinDir("../dist/build/bundle.manifest.json"),
            name: "[name]_[hash]"
        })
    ]
};
exports["default"] = config;
