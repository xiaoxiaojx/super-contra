import * as webpack from "webpack";
import * as path from "path";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";
const joinDir = p => path.join(__dirname, p);

const config: webpack.Configuration = {
  entry: [hotMiddlewareScript, joinDir("../src/app.tsx")],
  output: {
    path: joinDir("../dist"),
    publicPath: "/",
    filename: "js/app.bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"]
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
            use: "ts-loader"
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query:
            {
              presets: ["react"]
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
        use: "url-loader"
      }
    ]
  }
};

export default config;