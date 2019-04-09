const dotenv = require('dotenv');
dotenv.config();

const webpackDevServer = process.env.NODE_ENV === 'webpack-dev-server';
const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST || 'localhost';
const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT ? parseInt(process.env.DEV_SERVER_PORT, 10) : 2992;
const WEB_PORT = process.env.WEB_PORT ? parseInt(process.env.WEB_PORT, 10) : 3000;
const WEB_PATH = process.env.WEB_PATH || '/';

module.exports = {
    webpackDevServer,
    DEV_SERVER_HOST,
    DEV_SERVER_PORT,
    WEB_PORT,
    WEB_PATH,
};
