// eslint-disable-line no-undef
const path = require('path')
const config = require('./config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const context = path.resolve(__dirname, 'src')
const hasha = require('hasha')

const getSuffix = (str) => {
  var start = str.lastIndexOf('.')
  return str.slice(start)
}
const generateScopedName = (name, filename) => { // 统一css module命名
  var suffix = getSuffix(filename)
  const hash = hasha(filename + name, {
    algorithm: 'md5'
  })
  const basename = path.basename(filename, suffix)
  return `${basename}__${name}___${hash.slice(0, 5)}`
}

function absolutePath(str) {
  return path.resolve(process.cwd(), str)
}
var common = {
  entry: absolutePath('./src/index.tsx'),
  output: {
    path: isProduction ? config.product.assetsPath : (config.dev.assetPath || absolutePath('dist')),
    filename: 'js/[name].[hash].bundle.js',
    publicPath: isProduction ? config.product.assetsPublicPath : '', //输出文件的目录
    library: 'myLiblirary', // 到出库名称
    libraryTarget: 'umd' // 通用模块定义
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '@': absolutePath('src')
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: { // 模块规则
    rules: [
      {
        test: /\.ts?$|\.tsx?$/,
        include: [ // 会进行解析的文件夹
          absolutePath('src')
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/react',
              '@babel/env',
              '@babel/typescript'
            ],
            cacheDirectory: false,
            plugins: [
              'react-hot-loader/babel',
              '@babel/plugin-transform-runtime',
              'transform-class-properties',
              ['react-css-modules', {
                context,
                generateScopedName: function (x, y, z) { // x类名  资源绝对地址  z完整的scss文本
                    var arr = [].slice.apply(arguments)
                    return generateScopedName.apply({}, arr)
                },
                filetypes: {
                    '.less': {
                      'syntax': 'postcss-less',
                      'plugins': [
                        'postcss-nested'
                      ]
                    }
                }
              }],
              ['import', {
                'libraryName': 'antd',
                'libraryDirectory': 'es',
                'style': 'css'
              }]
            ]
          }
          

        }]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            options: isProduction ? {
              publicPath: '../'
            } : {}
          }, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            }
          }, {
            loader: 'less-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: absolutePath('src/index.html'),
      filename: (isProduction ? config.product.htmlName : '') || 'index.html'
    }),
    new webpack.NamedModulesPlugin()

  ]
}
var plugins = []
if (isProduction) {
  plugins.push(new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[id].css'
  }))
} else { // 开发时配置
  common.resolve.alias['react-dom'] = '@hot-loader/react-dom' 
}
plugins.forEach((x) => {
  common.plugins.push(x)
})
module.exports = common