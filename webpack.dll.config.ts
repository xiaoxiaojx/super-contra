import * as webpack from "webpack";
import * as path from "path";

const joinDir = p => path.join(__dirname, p);

const config: webpack.Configuration = {
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
            name: "[name]_[hash]",
        })
    ]
};

export default config;