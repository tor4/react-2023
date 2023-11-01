const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin, ProvidePlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function (webpackEnv) {
  const isProd = webpackEnv === 'production';

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        publicPath: '/',
        title: 'React App',
        template: './public/index.html'
      }),
      new DefinePlugin({
        ENV: webpackEnv,
      }),
      new ProvidePlugin({
        React: "react" // automatically import react where needed
      }),
      new BundleAnalyzerPlugin({ openAnalyzer: false })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(js|mjs|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@utils': path.resolve(__dirname, 'src/Utils'),
        '@components': path.resolve(__dirname, 'src/Components'),
      }
    },
    optimization: {
      minimize: isProd,
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
    }
  }
}