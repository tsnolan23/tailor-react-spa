const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default
const AssetsPlugin = require('assets-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const WebpackCdnPlugin = require('webpack-cdn-plugin')

const { cdn } = require('../environment.js')


module.exports = () => {
  return {
    entry: {
      client: resolve('src/index.jsx')
    },
    // externals: [ nodeExternals() ],
    externals: {
      'react': 'https://unpkg.com/react@16.6.3/umd/react.production.min.js',
      'react-dom': 'https://unpkg.com/react-dom@16.6.3/umd/react-dom.production.min.js'
    },
    output: {
      path: resolve('dist'),
      libraryTarget: 'amd',
      filename: '[chunkhash].client.js',
      publicPath: cdn
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve('src/index.ejs'),
        inject: false
      }),
      new MiniCssExtractPlugin(),
      new HTMLInlineCSSWebpackPlugin({
        replace: {
          removeTarget: true,
          target: '<!-- inline_css_plugin -->'
        }
      }),
      // new WebpackCdnPlugin({
      //   modules: [
      //     { name: 'react-dom', var: 'ReactDOM', path: `umd/react-dom.${process.env.NODE_ENV}.min.js` },
      //     { name: 'react', var: 'React', path: `umd/react.${process.env.NODE_ENV}.min.js` }
      //   ]
      // }),
      new AssetsPlugin({
        useCompilerPath: true
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
