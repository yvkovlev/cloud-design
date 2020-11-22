const path = require('path');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssnanoPlugin = require('cssnano-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';
const hash = isDevelopment ? '' : '-[contenthash:8]';

const PATH = {
    DIST: path.join(__dirname, 'dist'),
    SRC: path.join(__dirname, 'src'),
    TEMPLATE: path.join(__dirname, 'src/template/index.html'),
    FONTS: path.join(__dirname, 'src/assets/fonts'),
    FAVICONS: path.join(__dirname, 'src/assets/favicons'),
    MOCKS: path.join(__dirname, 'src/mocks'),
    ASSETS: path.join(__dirname, 'src/assets'),
};

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    context: __dirname,
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './src/index.jsx',
    ],
    output: {
        filename: `main${hash}.js`,
        path: PATH.DIST,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            '@utils': path.join(PATH.SRC, 'utils'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(scss|css)$/,
                exclude: path.join(PATH.ASSETS, '/css/vendor.scss'),
                use: [
                    {
                        loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]-[sha1:hash:hex:4]',
                            },
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer(),
                            ],
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: '@import "./src/css-utils/colors.scss"; @import "./src/css-utils/mixins.scss"; @import "./src/css-utils/animations.scss";',
                        },
                    },
                ],
            },
            {
                test: /\.(scss|css)$/,
                include: path.join(PATH.ASSETS, '/css/vendor.scss'),
                use: [
                    {
                        loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/,
                loader: 'file-loader',
                exclude: PATH.FAVICONS,
                options: {
                    name: `[name]${hash}.[ext]`,
                    outputPath: 'assets/images',
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                include: PATH.FONTS,
                loader: 'file-loader',
                options: {
                    name: `[name]${hash}.[ext]`,
                    outputPath: 'assets/fonts',
                },
            },
            {
                test: /\.(svg|png|jpe?g|gif|webmanifest|ico)$/,
                include: PATH.FAVICONS,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    devtool: 'source-map',
    plugins: [
        new ProgressBarPlugin({
            format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
            clear: false,
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: PATH.TEMPLATE,
        }),
        new MiniCssExtractPlugin({
            filename: `[name]${hash}.css`,
        }),
        new CopyPlugin({
            patterns: [
                { from: PATH.MOCKS, to: path.join(PATH.DIST, 'mocks') },
            ],
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ru'],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    optimization: {
        minimizer: [
            new CssnanoPlugin({
                sourceMap: true,
            }),
        ],
    },
};
