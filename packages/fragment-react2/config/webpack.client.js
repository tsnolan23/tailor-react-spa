const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default
const AssetsPlugin = require('assets-webpack-plugin')


const { cdn } = require('../server/environment.js')


module.exports = () => {
  return {
    entry: {
      client: resolve('src/index.jsx')
    },
    output: {
      path: resolve('dist'),
      libraryTarget: 'amd',
      filename: '[contenthash].js',
      publicPath: cdn
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve('src/index.ejs'),
        inject: false
      }),
      new MiniCssExtractPlugin({
        filename: '[contenthash].client.css'
      }),
      new HTMLInlineCSSWebpackPlugin({
        replace: {
          removeTarget: true,
          target: '<!-- inline_css_plugin -->'
        }
      }),
      new AssetsPlugin({
        path: resolve('dist'),
        filename: 'assets.json',
        update: true,
        processOutput: function (assets) {
          // object with html does not have key.
          // we need fix it
          assets = Object.keys(assets)
            .map(key => ({ [key || 'view']: assets[key] }))
            .reduce((prev, curr) => ({ ...prev, ...curr }), {})

          return JSON.stringify(assets)
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.js?x$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                locals: true,
                modules: true,
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
              }
            },
            'sass-loader'
          ]
        }
      ]
    }
  }
}
