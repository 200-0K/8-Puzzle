const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const commonConfig = require("./webpack.common");
const commonPlugins = commonConfig.plugins;
const commonRules = commonConfig.module.rules;
commonRules[0].use.unshift(MiniCSSExtractPlugin.loader); // external css

commonRules.push({
    test: /\.js$/i,
    exclude: /(node_modules)/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"],
        },
    },
});

commonPlugins.push(
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
        filename: "assets/style.[chunkhash].css",
    })
);

const config = {
    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "assets/[name].[chunkhash].js",
        chunkFilename: "assets/[name].[chunkhash].js",
    },
    mode: "production",
    optimization: {
        splitChunks: { chunks: "all" },
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
};

module.exports = Object.assign({}, commonConfig, config);
