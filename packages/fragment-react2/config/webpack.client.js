const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default


module.exports = () => {
  return {
    entry: resolve('src/index.jsx'),
    output: {
      path: resolve('dist/client'),
      libraryTarget: 'amd',
      filename: '[contenthash].js',
      // @todo env var
      publicPath: ''
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve('src/index.ejs'),
        // hash : true
        inject: false,
        filename: resolve('dist/index.html')
      }),
      new MiniCssExtractPlugin({
        filename: '[contenthash].client.css'
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
