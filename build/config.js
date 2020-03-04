let path = require('path')
let process = require('process')
function absolutePath (str) {
    return path.resolve(process.cwd(), str)
}
var dev = {
    port: 3030,
    proxy: [
        {
            context: ['/stock'],
            target: 'http://localhost:1599',
            secure: false,
            changeOrigin: true
        }
    ],
    static: absolutePath('static'), //静态文件夹目录
}
var product = {
    assetsPublicPath: 'static/', // index.html中引入js的路径
    assetsPath: absolutePath('dist/static/'), // 输出路径
    htmlName: '../index.html', // ../用来决定相对于assetsPath设置的路径
    staticGulpPublicConfig: absolutePath('public/**/**'),
    distPath: absolutePath('dist/')
}
module.exports = {
    dev, product
}