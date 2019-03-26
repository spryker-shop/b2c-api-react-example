const webpack = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );

const config = require( './server-config' );
const webpackConfig = require( './webpack.config' );

if (config.webpackDevServer) {
    new WebpackDevServer( webpack( webpackConfig ), {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        historyApiFallback: true,
    } ).listen( config.DEV_SERVER_PORT, config.DEV_SERVER_HOST, function (err, result) {
        if (err) {
            console.error( err );
        }
        console.info( 'Running Webpack Dev Server at ' + config.DEV_SERVER_HOST + ':' + config.DEV_SERVER_PORT );
    } );
}
