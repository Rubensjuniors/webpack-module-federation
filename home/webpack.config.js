const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin


module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: 'http://localhost:3003/',
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*", 
    },
    historyApiFallback: true,
    port: 3003
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    splitChunks: false,
},
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      title: 'App'
    }),
    new ModuleFederationPlugin({
      name: 'HomeApp',
      filename: 'remoteEntry.js',
      exposes: {
        './HomePage': './src/Home',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    }),

  ]
}

