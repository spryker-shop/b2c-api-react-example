const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const envConfig = require('./configs/env.config');
const BrotliPlugin = require('brotli-webpack-plugin');

const lintIndex = process.argv.join('').indexOf('lint');

const aliases = {
    src: path.resolve(__dirname, 'src'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@application': path.resolve(__dirname, 'src/application'),
    '@components': path.resolve(__dirname, 'src/application/components'),
    '@containers': path.resolve(__dirname, 'src/application/containers'),
    '@hoc': path.resolve(__dirname, 'src/application/hoc'),
    '@pages': path.resolve(__dirname, 'src/application/pages'),
    '@helpers': path.resolve(__dirname, 'src/helpers'),
    '@interfaces': path.resolve(__dirname, 'src/interfaces'),
    '@stores': path.resolve(__dirname, 'src/stores'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@configs': path.resolve(__dirname, './configs'),
    '@translation': path.resolve(__dirname, 'src/translation'),
    '@theme': path.resolve(__dirname, 'src/theme')
};

const definableConstants = {
    'process.env.NODE_ENV': JSON.stringify(envConfig.NODE_ENV),
    'process.env.WEB_PORT': JSON.stringify(envConfig.WEB_PORT),
    'process.env.WEB_PATH': JSON.stringify(envConfig.WEB_PATH),
    'process.env.API_URL': JSON.stringify(envConfig.API_URL),
    'process.env.DEV_SERVER_HOST': JSON.stringify(envConfig.DEV_SERVER_HOST),
    'process.env.DEV_SERVER_PORT': JSON.stringify(envConfig.DEV_SERVER_PORT),
    'process.env.APP_TITLE': JSON.stringify(envConfig.APP_TITLE)
};

const commonExtensions = ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.html', '.json', '.node', '.md'];
const webExtensions = ['.css', '.jpg', '.png'];

const cssLoader = {
    test: /\.css$/,
    include: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: false,
                sourceMap: !envConfig.IS_PRODUCTION,
                minimize: envConfig.IS_PRODUCTION,
                discardComments: {removeAll: true}
            }
        },
        {loader: 'resolve-url-loader'},
        {loader: 'postcss-loader'}
    ]
};

const webLoaders = [
    cssLoader,
    {test: /\.(jpg|png)$/, loader: 'url-loader?limit=8000'}
];

const tsLoader = {
    test: /\.tsx?$/,
    include: [
        path.resolve(__dirname, 'src')
    ],
    use: [
        {loader: 'ts-loader', options: {transpileOnly: true}},
        ...(
            lintIndex > 0 ? [{loader: 'tslint-loader'}] : []
        )
    ]
};

const commonLoaders = [
    {test: /\.node$/, loader: 'node-loader'},
    {test: /\.json$/, loader: 'json-loader'},
    tsLoader,
    {test: /\.html$/, loader: 'htmllint-loader!html-loader'},
    {test: /\.md$/, loader: 'html-loader!markdown-loader?gfm=false'},
    {test: /LICENSE$/, loader: 'html-loader!markdown-loader?gfm=false'}
];

let devServer = {};
let watchOptions = {};

if (envConfig.IS_DEV_SERVER) {
    watchOptions = {
        aggregateTimeout: 1000,
        poll: 1000
    };
    devServer = {
        contentBase: path.resolve(__dirname, 'build', 'web'),
        public: true,
        compress: true,
        historyApiFallback: {
            disableDotRule: true
        },
        host: envConfig.DEV_SERVER_HOST,
        port: envConfig.DEV_SERVER_PORT,
        https: false,
        inline: true,
        noInfo: false
    };
}

const entry = {
    app: [
        './src/index.tsx'
    ]
};

if(envConfig.IS_DEV_SERVER) {
    entry['dev-server-client'] = 'webpack-dev-server/client?http://' + envConfig.DEV_SERVER_HOST + ':' + envConfig.DEV_SERVER_PORT;
    entry['dev-server-hot'] = 'webpack/hot/only-dev-server';
}

const config = {
    mode: envConfig.IS_PRODUCTION ? 'production' : 'development',
    target: 'web',
    context: __dirname,
    entry,
    node: {
        __dirname: true,
        fs: 'empty'
    },
    output: {
        path: path.resolve(__dirname, 'build', 'web'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        publicPath: envConfig.IS_DEV_SERVER ? 'http://' + envConfig.DEV_SERVER_HOST + ':' + envConfig.DEV_SERVER_PORT + '/' : WEB_PATH
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
            ...definableConstants
        }),
        new MiniCssExtractPlugin({
            filename: envConfig.IS_DEV_SERVER ? '[name].css' : '[name].[hash].css',
            chunkFilename: envConfig.IS_DEV_SERVER ? '[id].css' : '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.ejs'),
            title: envConfig.APP_TITLE || '',
            filename: 'index.html',
            hash: true,
            compile: true,
            favicon: path.resolve(__dirname, `favicon.png`),
            minify: false,
            devServer: envConfig.IS_DEV_SERVER ? 'http://' + envConfig.DEV_SERVER_HOST + ':' + envConfig.DEV_SERVER_PORT : '',
            chunksSortMode: 'none'
        }),
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ...(
            envConfig.IS_DEV_SERVER ? [
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
            ...commonExtensions,
            ...webExtensions
        ],
        alias: {
            ...aliases
        }
    },
    module: {
        rules: [
            ...commonLoaders,
            ...webLoaders
        ]
    },
    stats: {
        children: false,
        reasons: !envConfig.IS_PRODUCTION
    },
    cache: true,
    performance: {
        hints: 'warning'
    },
    watch: envConfig.IS_DEV_SERVER,
    watchOptions,
    devtool: envConfig.IS_PRODUCTION ? '' : 'inline-source-map',
    devServer
};

module.exports = config;
