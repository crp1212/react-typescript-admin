const config = require('./config.js')
process.env.NODE_ENV = 'production'

const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')


function absolutePath(str) {
    return path.resolve(process.cwd(), str)
}
module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: true, // 打包过程中移除所有的console语句
                    },
                    output: {
                        beautify: false,
                        comments: false
                    }

                }
            })
        ]
    },
    recordsPath: path.join(__dirname, '../records.json'),
    plugins: [
        new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
        }),
    ]
})