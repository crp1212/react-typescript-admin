
const config = require('./config.js')
const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const opn =require('opn')

const webpackConfig = require('./webpack.dev.config.js')
console.log(config.dev.proxy)
const options = {
    hot: true,
    host: 'localhost',
    proxy: config.dev.proxy, 
    contentBase: config.dev.static,
    historyApiFallback: {
        index: 'src/index.html'
    },
}
webpackDevServer.addDevServerEntrypoints(webpackConfig, options)
const compiler = webpack(webpackConfig)
const server = new webpackDevServer(compiler, options)

server.listen(config.dev.port, 'localhost', () => {
    console.log('dev server listening on port ' + config.dev.port)
    // opn('http://localhost:' + config.dev.port, { app: 'chrome' })
})