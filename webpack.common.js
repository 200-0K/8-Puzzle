const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const postCSSPlugins = [
    require("autoprefixer"),
    require("postcss-import"),
    require("postcss-nested"),
];

module.exports = {
    entry: {
        main: path.resolve("./src/assets/scripts/App.js"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css/i,
                use: [
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: { plugins: postCSSPlugins },
                        },
                    },
                ],
            },
        ],
    },
};
