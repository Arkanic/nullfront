const path = require("path");

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",

    stats: {
        children: true
    },

    entry: {
        index: "./src/client/index.ts"
    },
    output: {
        filename: "[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        moduleIds: "deterministic",
        minimizer: [
            new TerserJSPlugin({})
        ]
    },
    resolve: {
        extensions: [
            ".ts", ".tsx",
            ".js",
            ".css", ".scss"
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-modules-typescript-loader"
                    },
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            sourceMap: false
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg|obj|glb|wav|ogg|mp3)$/i,
                exclude: /node_modules/,
                type: "asset/resource",
            }
        ]
    },
    
    plugins: [
        /*new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/client/assets/icons/",
                    to: ""
                }
            ]
        }),*/
        new MiniCSSExtractPlugin({
            filename: "[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/client/templates/index.html",
            chunks: ["index"]
        }),
        new CleanWebpackPlugin()
    ]
}