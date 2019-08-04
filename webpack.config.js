const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: [
        './src/index.js',
        './src/sass/style.sass'
    ],
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].[hash].bundle.js'
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: 'images/[name].[ext]'}
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: 'fonts/[name].[ext]'}
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.pug$/,
                exclude: '/node_modules/',
                use: {
                    loader: "pug-loader"
                }
            },
            {
                test: /\.(sass|scss)$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development',
                        }
                    }
                ]
            },
        ]

    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.pug",
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === 'development' ? "[name].css" : "[name].[hash].css",
            chunkFilename: process.env.NODE_ENV === 'development' ? "[id].css" : "[id].[hash].css"
        }),
        new CopyWebpackPlugin([
            {
                from: './src/images',
                to: './images'
            },
            {
                from: './src/icons',
                to: './icons'
            },
            {
                from: './src/fonts',
                to: './fonts'
            }
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        compress: true,
        port: 9090,
        https: true
    }
};