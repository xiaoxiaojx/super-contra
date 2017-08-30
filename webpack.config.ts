import * as webpack from 'webpack';
import * as path from 'path';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const joinDir = p => path.join(__dirname, p)
const config: webpack.Configuration = {
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
            query:
            {
              presets:['react']
            }
        }
    ]
  }
};

export default config;