const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = () => {
  return {
    entry: resolve('src/test.jsx'),
    output: {
      path: resolve('dist'),
      libraryTarget: 'amd',
      filename: 'bundle.client.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve('src/index.ejs'),
        // hash : true
        inject: false
      }),
      // new MiniCssExtractPlugin({
      //   filename: 'bundle.client.css'
      // })
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
            // MiniCssExtractPlugin.loader,
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
