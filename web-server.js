const express = require('express');
const path = require('path');
const http = require('http');
const config = require('./env_config');

const webPath = config.WEB_PATH;
const webServer = express();
const appRouter = express.Router();

webServer.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

appRouter.use(express.static(path.join(__dirname, 'build/web')));

appRouter.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/web/index.html'));
});

webServer.use(webPath, appRouter);

webServer.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

webServer.set('port', config.WEB_PORT);

const server = http.createServer(webServer);

server.listen(config.WEB_PORT, () => console.info(`Running Web Server at localhost:${config.WEB_PORT}`));

module.exports = server;
