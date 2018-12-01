const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default

const { cdn } = require('../environment.js')


module.exports = () => {
  return {
    entry: resolve('src/index.jsx'),
    output: {
      path: resolve('dist'),
      libraryTarget: 'amd',
      filename: 'bundle.client.js',
      publicPath: cdn
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateContent: '<!-- inline_css_plugin -->',
        inject: false
      }),
      new MiniCssExtractPlugin({
        filename: 'bundle.client.css'
      }),
      new HTMLInlineCSSWebpackPlugin({
        replace: {
          removeTarget: true,
          target: '<!-- inline_css_plugin -->'
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
