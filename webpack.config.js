const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const envConfig = require('./env_config');
const webpackSettings = require('./webpack-settings');

const config = {
    mode: envConfig.IS_PRODUCTION ? 'production' : 'development',
    target: 'web',
    context: __dirname,
    entry: webpackSettings.entry,
    watchOptions: webpackSettings.watchOptions,
    devServer: webpackSettings.devServer,
    watch: !envConfig.IS_PRODUCTION,
    devtool: envConfig.IS_PRODUCTION ? '' : 'inline-source-map',
    node: {
        __dirname: true,
        fs: 'empty'
    },
    output: {
        path: path.resolve(__dirname, 'build', 'web'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        publicPath: !envConfig.IS_PRODUCTION ? 'http://' + envConfig.DEV_SERVER_HOST + ':' + envConfig.DEV_SERVER_PORT + '/' : envConfig.WEB_PATH
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
                cache: !envConfig.IS_PRODUCTION,
                extractComments: envConfig.IS_PRODUCTION,
                uglifyOptions: {
                    ecma: 8,
                    parse: {
                        ecma: 8
                    },
                    mangle: envConfig.IS_PRODUCTION ? {
                        keep_classnames: true,
                        keep_fnames: true
                    } : false,
                    keep_classnames: true,
                    keep_fnames: true,
                    compress: {
                        drop_console: envConfig.IS_PRODUCTION,
                        keep_classnames: true,
                        comparisons: false
                    },
                    output: {
                        beautify: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'async',
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors',
                    chunks: 'all',
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['build/web'], {
            root: path.resolve(__dirname),
            verbose: true,
            dry: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: envConfig.IS_PRODUCTION,
            debug: !envConfig.IS_PRODUCTION,
            options: {
                context: __dirname
            }
        }),
        new webpack.DefinePlugin({
            __WEB__: true,
            __SERVER__: false,
            'global.GENTLY': false,
            ...webpackSettings.definableConstants
        }),
        new MiniCssExtractPlugin({
            filename: !envConfig.IS_PRODUCTION ? '[name].css' : '[name].[hash].css',
            chunkFilename: !envConfig.IS_PRODUCTION ? '[id].css' : '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.ejs'),
            title: envConfig.APP_TITLE || '',
            filename: 'index.html',
            hash: true,
            compile: true,
            favicon: path.resolve(__dirname, `favicon.png`),
            minify: false,
            devServer: !envConfig.IS_PRODUCTION ? 'http://' + envConfig.DEV_SERVER_HOST + ':' + envConfig.DEV_SERVER_PORT : '',
            chunksSortMode: 'none'
        }),
        ...(
            !envConfig.IS_PRODUCTION ? [
                new webpack.HotModuleReplacementPlugin(),
                new ForkTsCheckerWebpackPlugin({
                    tslint: true
                }),
            ] : []
        ),
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        extensions: [
            ...webpackSettings.extensions
        ],
        alias: {
            ...webpackSettings.aliases
        }
    },
    module: {
        rules: [
            ...webpackSettings.loaders
        ]
    },
    stats: {
        children: false,
        reasons: !envConfig.IS_PRODUCTION
    },
    cache: true,
    performance: {
        hints: 'warning'
    }
};

module.exports = config;
