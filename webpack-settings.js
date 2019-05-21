const envConfig = require('./configs/env_config');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const lintIndex = process.argv.join('').indexOf('lint');

const commonExtensions = ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.html', '.json', '.node', '.md'];
const webExtensions = ['.css', '.jpg', '.png'];
const extensions = [...commonExtensions, ...webExtensions];

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

const loaders = [
    tsLoader,
    {test: /LICENSE$/, loader: 'html-loader!markdown-loader?gfm=false'},
    cssLoader,
    {test: /\.gif(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
    {test: /\.(jpg|png)$/, loader: 'url-loader?limit=8000'}
];

const aliases = {
    src: path.resolve(__dirname, 'src'),
    '@constants': path.resolve(__dirname, 'src/constants'),
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

let devServer = {};
let watchOptions = {};

if (!envConfig.IS_PRODUCTION) {
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

if(!envConfig.IS_PRODUCTION) {
    entry['dev-server-client'] = 'webpack-dev-server/client?http://' + envConfig.DEV_SERVER_HOST + ':' + envConfig.DEV_SERVER_PORT;
    entry['dev-server-hot'] = 'webpack/hot/only-dev-server';
}

module.exports = {
    watchOptions,
    devServer,
    entry,
    extensions,
    aliases,
    definableConstants,
    loaders
};
