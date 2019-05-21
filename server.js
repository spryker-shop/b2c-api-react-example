const config = require('./env_config');

let devServer;
let webServer;

if (!config.IS_PRODUCTION) {
    devServer = require('./dev-server');
} else {
    webServer = require('./web-server');
}

module.exports = {
    devServer,
    webServer
};
