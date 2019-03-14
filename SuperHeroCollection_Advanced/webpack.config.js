var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/index.html'),
  inject: false,  // Prevent duplicate loading: https://stackoverflow.com/a/38292765
  minify: {
    removeEmptyElements: false // https://stackoverflow.com/a/51820854
  }
});

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'], // https://stackoverflow.com/a/38778792
    alias: {
      src: path.resolve(__dirname, './src/'),
      Styles: path.resolve(__dirname, './assets/styles/')
    }
  },
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
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,  // Convert images < 100kb to base64 strings
              name: '[name].[ext]',
              publicPath:'assets/images/'
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,  // If not babel will take a long time because there are many js files inside
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};