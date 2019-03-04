var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  plugins: [
  	new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      inject: false,  // Prevent duplicate loading: https://stackoverflow.com/a/38292765
      minify: {
        removeEmptyElements: false // https://stackoverflow.com/a/51820854
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader',   // translates CSS into CommonJS
          'sass-loader'   // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};