"use strict";
exports.__esModule = true;
var express = require("express");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpack_config_1 = require("./webpack.config");
var app = express();
var compiler = webpack(webpack_config_1["default"]);
app.use(webpackDevMiddleware(compiler, {
    stats: {
        colors: true,
        chunks: false,
        children: false
    }
}));
app.use(webpackHotMiddleware(compiler));
app.listen(3333, function (err) {
    if (err) {
        return console.error(err);
    }
    console.info("Listening at http://localhost:3333");
});
