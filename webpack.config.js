const path = require('path');
const env = require('dotenv');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

env.config();

const IS_PRODUCTION = process.env.NODE_ENV === 'production' || process.argv.indexOf('-p') !== -1;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV_SERVER = NODE_ENV === 'webpack-dev-server';
const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST ? process.env.DEV_SERVER_HOST : 'localhost';
const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT ? process.env.DEV_SERVER_PORT : '2992';
const WEB_PORT = process.env.WEB_PORT ? process.env.WEB_PORT : '4200';
const WEB_PATH = process.env.WEB_PATH ? process.env.WEB_PATH : '/api/';
const API_URL = process.env.API_URL ? process.env.API_URL : 'http://localhost:8080/api/';
const APP_TITLE = process.env.APP_TITLE || 'App';
const commonExtensions = ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.html', '.json', '.node'];
const webExtensions = ['.css', '.less', '.sass', '.scss', '.woff', '.woff2', '.ttf', '.eot', '.svg', '.md', '.jpg', '.png', '.ico'];

const definableConstants = {
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    'process.env.WEB_PORT': JSON.stringify(WEB_PORT),
    'process.env.WEB_PATH': JSON.stringify(WEB_PATH),
    'process.env.API_URL': JSON.stringify(API_URL),
    'process.env.DEV_SERVER_HOST': JSON.stringify(DEV_SERVER_HOST),
    'process.env.DEV_SERVER_PORT': JSON.stringify(DEV_SERVER_PORT),
    'process.env.APP_TITLE': JSON.stringify(APP_TITLE)
};

const globalCssLoaderOptions = {
    loader: 'css-loader',
    options: {
        modules: false,
        sourceMap: !IS_PRODUCTION,
        minimize: IS_PRODUCTION,
        discardComments: {removeAll: true}
    }
};

const localCssLoaderOptions = {
    loader: 'css-loader',
    options: {
        camelCase: true,
        modules: true,
        localIdentName: !IS_PRODUCTION ? '[path]___[name]__[local]___[hash:base64:5]' : '[hash:base64:5]',
        sourceMap: !IS_PRODUCTION,
        minimize: IS_PRODUCTION,
        discardComments: {removeAll: true}
    }
};

const sassLoaderOptions = {
    loader: 'sass-loader',
    options: {
        includePaths: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src')
        ]
    }
};

const localCssLoader = {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        localCssLoaderOptions,
        {loader: 'resolve-url-loader'},
        {loader: 'postcss-loader'}
    ]
};

const localSaasLoader = {
    test: /\.sass$/,
    exclude: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        localCssLoaderOptions,
        {loader: 'resolve-url-loader'},
        {loader: 'postcss-loader'},
        sassLoaderOptions
    ]
};

const localScssLoader = {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        localCssLoaderOptions,
        {loader: 'resolve-url-loader'},
        {loader: 'postcss-loader'},
        sassLoaderOptions
    ]
};

const globalCssLoader = {
    test: /\.css$/,
    include: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        globalCssLoaderOptions,
        {loader: 'resolve-url-loader'},
        {loader: 'postcss-loader'}
    ]
};

const globalSaasLoader = {
    test: /\.sass$/,
    include: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        globalCssLoaderOptions,
        {loader: 'resolve-url-loader'},
        {loader: 'postcss-loader'},
        sassLoaderOptions
    ]
};

const globalScssLoader = {
    test: /\.scss$/,
    include: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        globalCssLoaderOptions,
        {loader: 'resolve-url-loader'},
        {loader: 'postcss-loader'},
        sassLoaderOptions
    ]
};

const tsLoader = {
    test: /\.tsx?$/,
    include: [
        path.resolve(__dirname, 'src')
    ],
    use: [
        {loader: 'ts-loader', options: {transpileOnly: true, experimentalWatchApi: true}},
        {loader: 'tslint-loader'}
    ]
};

const staticLoaders = [
    {test: /\.gif(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
    {test: /\.(jpg|png|svg)$/, loader: 'url-loader?limit=8000'},
    {
        test: /\.(ttf|otf|eot|svg|ico|woff(2)?)$/,
        include: [
            path.join(__dirname, 'src'),
        ],
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
        }]
    }
];

const stylesLoaders = [
    localCssLoader,
    localSaasLoader,
    localScssLoader,
    globalCssLoader,
    globalSaasLoader,
    globalScssLoader
];

const commonLoaders = [
    {test: /\.node$/, loader: 'node-loader'},
    {test: /\.json$/, loader: 'json-loader'},
    tsLoader,
    {test: /\.html$/, loader: 'htmllint-loader!html-loader'},
    {test: /\.md$/, loader: 'html-loader!markdown-loader?gfm=false'},
    {test: /LICENSE$/, loader: 'html-loader!markdown-loader?gfm=false'}
];

const webLoaders = [
    ...stylesLoaders,
    ...staticLoaders
];

let devServer = {};
let watchOptions = {};

if (IS_DEV_SERVER) {
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
        host: DEV_SERVER_HOST,
        port: DEV_SERVER_PORT,
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

if(IS_DEV_SERVER) {
    entry['dev-server-client'] = 'webpack-dev-server/client?http://' + DEV_SERVER_HOST + ':' + DEV_SERVER_PORT;
    entry['dev-server-hot'] = 'webpack/hot/only-dev-server';
}

const config = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    target: 'web',
    context: __dirname,
    entry,
    node: {
        __dirname: true
    },
    output: {
        path: path.resolve(__dirname, 'build', 'web'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        publicPath: IS_DEV_SERVER ? 'http://' + DEV_SERVER_HOST + ':' + DEV_SERVER_PORT + '/' : WEB_PATH
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
                cache: !IS_PRODUCTION,
                extractComments: IS_PRODUCTION,
                uglifyOptions: {
                    ecma: 8,
                    parse: {
                        ecma: 8
                    },
                    mangle: IS_PRODUCTION ? {
                        keep_classnames: true,
                        keep_fnames: true
                    } : false,
                    keep_classnames: true,
                    keep_fnames: true,
                    compress: {
                        drop_console: IS_PRODUCTION,
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
            minimize: IS_PRODUCTION,
            debug: !IS_PRODUCTION,
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
            filename: IS_DEV_SERVER ? '[name].css' : '[name].[hash].css',
            chunkFilename: IS_DEV_SERVER ? '[id].css' : '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.ejs'),
            title: APP_TITLE || '',
            filename: 'index.html',
            hash: true,
            compile: true,
            favicon: path.resolve(__dirname, `favicon.png`),
            minify: false,
            devServer: IS_DEV_SERVER ? 'http://' + DEV_SERVER_HOST + ':' + DEV_SERVER_PORT : '',
            chunksSortMode: 'none'
        }),
        ...(
            IS_DEV_SERVER ? [
                new webpack.HotModuleReplacementPlugin(),
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
            src: path.resolve(__dirname, 'src'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@application': path.resolve(__dirname, 'src/application'),
            '@helpers': path.resolve(__dirname, 'src/helpers'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces'),
            '@stores': path.resolve(__dirname, 'src/stores'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@configs': path.resolve(__dirname, 'src/configs'),
            '@translation': path.resolve(__dirname, 'src/translation'),
            '@theme': path.resolve(__dirname, 'src/theme')
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
        reasons: !IS_PRODUCTION
    },
    cache: true,
    performance: {
        hints: 'warning'
    },
    watch: IS_DEV_SERVER,
    watchOptions,
    devtool: IS_PRODUCTION ? 'source-map' : 'inline-source-map',
    devServer
};

module.exports = config;
