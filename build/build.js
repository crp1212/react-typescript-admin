const webpack = require('webpack')
const baseConfig = require('./webpack.build.config.js')
const config = require('./config.js')
const rm = require('rimraf')
const ora = require('ora')
const chalk = require('chalk')
const log = require('./writelog.js')
const process = require('process')
var start = Date.now()
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')
if (process.argv[2] === '-a') {
    baseConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 8919
    }))
}
var spinner = ora('building for production...')
spinner.start()


rm(config.product.assetsPath, err => {
    if (err) throw err
    webpack(baseConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        var str = stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n'
        process.stdout.write(str)
        console.log(chalk.green(`打包用时: ${Date.now() - start}ms`)) // SizeFormatHelpers
        var jsonobj = stats.toJson()
        log(jsonobj)
    })
})
