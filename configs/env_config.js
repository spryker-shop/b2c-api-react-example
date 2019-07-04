const env = require( 'dotenv' );

env.config();
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const NODE_ENV = process.env.NODE_ENV || 'development';
const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST || 'localhost';
const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT || '2992';
const WEB_PORT = process.env.WEB_PORT || '3000';
const WEB_PATH = process.env.WEB_PATH || '/';
const API_URL = process.env.API_URL || 'http://localhost:8080/api/';
const APP_TITLE = process.env.APP_TITLE || 'App';

module.exports = {
    IS_PRODUCTION,
    IS_DEVELOPMENT,
    NODE_ENV,
    DEV_SERVER_HOST,
    DEV_SERVER_PORT,
    WEB_PORT,
    WEB_PATH,
    API_URL,
    APP_TITLE
};
