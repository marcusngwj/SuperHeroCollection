## Description
A Single Page Application (SPA) containing information on heros from different publishers.
The purpose of this exercise is to practise front-end development with `npm`, `webpack`, `Sass` and `react`.
Details of the exercise requirements can be found [here](https://github.com/janakanuwan/web-page-design/tree/master/react-exercise-1 "CS3249 Tutorial Exercise - React").

<p align="center">
<img src="docs/screen-recording.gif" />
</p>

## Instructions
1. Run `npm install` to install all dependencies stated in package.json
2. Run `npm run build` to make a build
3. Run `npm start` to start the server
4. Open Chrome and go to http://localhost:9000/ 

## Steps to create this project from scratch
1. Create a new directory to contain the project
```
mkdir superhero-collection
cd superhero-collection
```
2. Initialise npm to configure project
```
npm init
```
3. Install webpack 4 as a development dependency locally
```
npm install --save-dev webpack
npm install --save-dev webpack-cli
```
> Refer to [Semantic Versioning](https://bytearcher.com/articles/semver-explained-why-theres-a-caret-in-my-package-json/) to understand `"webpack":"^4.29.4"`
4. Add `{"private":true}` to `package.json` to prevent an accidental publish of the code
5. Append `{"build":"webpack --mode development"}` to `"scripts:{}"` in `package.json`
6. Create the `src` directory
```
mkdir src
```
7. Create and add `index.js` to `src`
8. Create and add `index.html` to `src`
9. Add `main.js` to `index.html` so that it can linked to the javascript file in the `dist` folder after a build
```
<script src="main.js"></script>
```
10. Install `webpack-dev-server`
```
npm install --save-dev webpack-dev-server
```
11. Append `{"start": "webpack-dev-server --mode development --hot --inline --open"}` to `"scripts:{}"` in `package.json`
> Add `--hot --inline` to enable [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) <br>
> Add `--open` to open up in default browser upon starting
12. Create `webpack.config.js` in the same directory as `package.json`
```
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
13. Appened the following to `module.exports` in `webpack.config.js` to change the serving directory for `webpack-dev-server`
```
module.exports = {
  
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};
```
14. Install [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) to assist in generating a `index.html` in the `dist` directory
```
npm i -D html-webpack-plugin
```
15. Configure the plugin in `webpack.config.js`
```
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/index.html'),
  inject: false,  // Prevent duplicate loading: https://stackoverflow.com/a/38292765
  minify: {
    removeEmptyElements: false // https://stackoverflow.com/a/51820854
  }
});

module.exports = {
  plugins: [htmlWebpackPlugin]
};
```
> Make plugins as variables so that one can see the different types of plugin used at one glance
16. Install `sass-loader` and `node-sass`
```
npm install sass-loader node-sass webpack --save-dev
```
17. Insall `style-loader` and `css-loader` to chain with `sass-loader`
```
npm install style-loader css-loader --save-dev
```
18. Install `url-loader` for loading of images
```
npm install url-loader --save-dev
```
> Refer to [HeroView](src/components/HeroView.js) on how to import images
19. Add all loaders to `webpack.config.js`
```
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
      }
    ]
  }
```
20. Install `react` and `react-dom` as dependencies
```
npm install --save react react-dom
```

> 'react' and 'react-dom' are saved as production dependencies because these libraries are still being used even after transpilation.
> Eg. ReactDOM.render()

21. Install `babel`
```
npm install --save-dev @babel/preset-react @babel/core @babel/preset-env babel-loader
```
22. Add to `webpack.config.js`
```
module.exports = {
  module: {
    rules: [
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
};
```
23. Rename `src/index.js` to `src/index.jsx`
24. Change entry point in `webpack.config.js`
```
entry: './src/index.jsx'
```
25. Update `webpack.config.js` to automatically resolve `.jsx` extensions
```
module.exports = {
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
  }
};
```
> See [resolve extensions](https://webpack.js.org/configuration/resolve/#resolveextensions) for more details
26. Use [alias](https://webpack.js.org/configuration/resolve/#resolvealias) in `webpack.config.js` to resolve paths
```
module.exports = {
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src/'),
      Styles: path.resolve(__dirname, './assets/styles/')
    }
  }
};
```
27. Install [json-server](https://github.com/typicode/json-server) to set up a mock server to load data via HTTP
```
npm i -D json-server
```
28. Create a `test` directory in the same directory as `src`
29. Copy [heroes_db.json](https://raw.githubusercontent.com/janakanuwan/web-page-design/master/webpack-example-react-3/test/heroes_db.json) to `test` directory. (Original Source: [superhero-api](https://github.com/akabab/superhero-api))
30. Append `{"mock:REST": "json-server --watch test/heroes_db.json"}` to `"scripts:{}"` in `package.json`
31. Start the server using `npm run mock:REST` on a different terminal
> Go to http://localhost:3000/heroes/ to view all hero data
32. Use [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to get data from the server