const webpack = require('webpack');
//const dotenv = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const json5 = require('json5');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// dotenv.config({
//     path: path.join(__dirname, '.env')
// });



const serverConfig = {
    target: 'node',
    entry: {
        server: {
            import: './server/App.ts',
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'nodeServer.js',
    },
    module: {
        rules: [
          {
            test: /\.ts(x)?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
          },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js' ],
    },
    externalsPresets: {node: true},
    externals: [nodeExternals()],
};

const clientConfig = (env) => {
    return {
  target: "web",
  entry: {
      index: { 
          import: './src/index.tsx',
      },
      /*app: {
          import:'./server/App.ts',
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
    // filename: '[name].[contenthash].js',
    filename:'[name].js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true,
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
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new HtmlWebpackPlugin({
        title: 'Remove Image Background',
    }),
    new MiniCssExtractPlugin({
        filename: './css/[name].css'
    }),
    new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(env.API_URL)
    }),
  ],
}};

module.exports = (env) => {
    return [serverConfig,clientConfig(env)]
};

