const config = require('./configs/env_config');

let devServer;
let webServer;

if (config.IS_DEV_SERVER) {
    devServer = require('./dev-server');
} else {
    webServer = require('./web-server');
}

module.exports = {
    devServer,
    webServer
};
