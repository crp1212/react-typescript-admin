let path = require('path')
let process = require('process')
function absolutePath (str) {
    return path.resolve(process.cwd(), str)
}
var dev = {
    port: 3318,
    proxy: { /* 详细了解 https://webpack.js.org/configuration/dev-server/ */
        '/': {
            target: 'http://localhost:3000',
            secure: false
        }
    },
    static: absolutePath('static'), //静态文件夹目录
}
var product = {
    assetsPublicPath: 'static', // index.html中引入js的路径
    assetsPath: absolutePath('dist/static'), // 输出路径
    htmlName: '../index.html', // ../用来决定相对于assetsPath设置的路径
}
module.exports = {
    dev, product
}