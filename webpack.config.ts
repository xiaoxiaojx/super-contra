import * as webpack from "webpack";
import * as path from "path";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";
const joinDir = p => path.join(__dirname, p);

console.log(`WebPack build in ${process.env.NODE_ENV} ...`);

const proPlugins: webpack.ResolvePlugin[] = [
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production")
    }
  }),
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false
  //   }
  // })
];
const devPlugins: webpack.ResolvePlugin[] = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: "\"development\""
    }
  })
];
const currentPlugins = process.env.NODE_ENV === "production" ? proPlugins : devPlugins;

const config: webpack.Configuration = {
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
            query:
            {
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

export default config;