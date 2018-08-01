import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import SimpleProgressWebpackPlugin from 'simple-progress-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import dotenv from 'dotenv'

dotenv.config()

const {
  NODE_ENV = 'development',
  PORT = 8080,
  API_URL,
  API_TOKEN,
} = process.env
const SOURCE_PATH = path.resolve(__dirname, './src')
const PUBLIC_PATH = path.resolve(__dirname, './public')
const DIST_PATH = path.resolve(__dirname, './dist')

/**
 * Base configuration
 */
const config = {
  mode: NODE_ENV,

  output: {
    path: DIST_PATH,
    publicPath: '/',
    filename:
      NODE_ENV === 'development' ? 'js/[name].js' : 'js/[name].[hash:8].js',
  },

  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 100,
  },

  devtool: NODE_ENV === 'development' && '#inline-source-map',

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NodeEnvironmentPlugin('NODE_NODE_ENV'),
    new SimpleProgressWebpackPlugin({
      format: NODE_ENV === 'development' ? 'minimal' : 'compact',
    }),
    new ExtractTextPlugin({
      filename: NODE_ENV === 'development' ? 'main.css' : 'main.[hash:8].css',
      allChunks: true,
      disable: NODE_ENV === 'development',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC_PATH, './index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV,
        API_TOKEN,
        API_URL,
      }),
    }),
    // new VueLoaderPlugin(),
    new ExtractTextPlugin({
      filename:
        NODE_ENV === 'development' ? 'css/main.css' : 'css/main.[hash:8].css',
      disable: NODE_ENV === 'development',
      allChunks: true,
    }),
    new FaviconsWebpackPlugin(path.resolve(PUBLIC_PATH, './favicon.png')),
  ],

  resolve: {
    modules: ['node_modules', SOURCE_PATH],
    extensions: ['.js', '.vue', '.css'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },

  devServer: {
    port: PORT,
    contentBase: DIST_PATH,
    hot: true,
    historyApiFallback: true,
    // proxy: {
    //   '/api': API_URL,
    // },
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: [/node_modules/, /\.spec.js$/],
        include: [SOURCE_PATH],
      },

      {
        loader: 'vue-loader',
        test: /\.vue$/,
      },

      {
        loader: 'url-loader',
        test: /\.(png|jpe?g|svg|ttf|eot|woff|woff2)$/,
        options: {
          limit: 8000,
        },
      },
    ],
  },
}

if (NODE_ENV === 'development') {
  config.module.rules.push({
    test: /\.css$/,
    loaders: ['vue-style-loader', 'css-loader', 'postcss-loader'],
  })

  config.plugins.push(
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    })
  )
}

if (NODE_ENV === 'production') {
  config.module.rules.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'vue-style-loader',
      use: 'css-loader?importLoaders=1&minimize=1!postcss-loader',
    }),
  })
}

export default config
