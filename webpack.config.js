const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  target: 'web',
  entry: path.join(__dirname, 'src', 'js', 'main.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer],
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg|png)(\?.*$|$)/,
        use: [{ loader: 'ignore-loader' }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.styl', '.css'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  stats: {
    colors: true,
    errorDetails: false
  },
  plugins: [
    new webpack.DefinePlugin({
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'public/index.html'),
      favicon: path.join(__dirname, 'public/favicon.ico'),
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/\.(jpe|jpg|woff|woff2|eot|ttf|svg|png)(\?.*$|$)/),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'none',
    port: process.env.PORT || 3000
  },
  node: {
    fs: 'empty'
  }
};
