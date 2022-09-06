const webpack = require('webpack');
const path = require('path');
/*const toml = require('toml');
const yaml = require('yamljs');*/
const json5 = require('json5');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: {
      index: { 
          import: './src/index.tsx',
      },
      /*app: {
          import:'./src/App.tsx',
      },*/
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
      static: './dist',
      port:1414,
      hot: true,
  },
  output: {
    publicPath: 'auto',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
      usedExports:true,
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
          cacheGroups: {
              vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all',
              },
          },
      },
  },
  module: {
    rules: [
      /*{
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader',
        exclude: /node_modules/
      },*/
      {
        test: /\.less$/,
        use: [
            /*'style-loader',*/
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
        ],
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },  
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      /*{
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },*/
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  resolve: {
    symlinks: false,
    aliasFields: ['browser'],
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new HtmlWebpackPlugin({
        title: 'Remove Image Background',
    }),
    new MiniCssExtractPlugin({
        filename: './css/[name].css'
    }),
    // new webpack.ProvidePlugin({
    //     _: 'lodash',
    // }),
  ],
};

module.exports = config;

