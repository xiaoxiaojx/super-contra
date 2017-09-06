import * as express from "express";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import config from "./webpack.config";

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    stats: {
      colors: true,
      chunks: false,
      children: false
    }
}));
app.use(webpackHotMiddleware(compiler));


app.listen(3333, err => {
    if (err) {
        return console.error(err);
    }
    console.info("Listening at http://localhost:3333");
});