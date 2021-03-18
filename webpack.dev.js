const path = require("path");
const commonConfig = require("./webpack.common");
commonConfig.module.rules[0].use.unshift("style-loader"); // inlined css

const config = {
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, "dev"),
    },
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "src"),
        inline: true,
        host: true,
        port: 3030,
        host: "0.0.0.0",
    },
};

module.exports = Object.assign(commonConfig, config);
