## Description
A Single Page Application (SPA) containing information on heros from different publishers.
The purpose of this exercise is to practise front-end development with `npm`, `webpack` and `Sass`.
Details of the exercise requirements can be found [here](https://github.com/janakanuwan/web-page-design/tree/master/webpack-exercise-1 "CS3249 Tutorial Exercise 1").

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
6. Create the `src` and `assets` directories
```
mkdir src
mkdir assets
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
11. Append `{"start": "webpack-dev-server --mode development --hot --inline"}` to `"scripts:{}"` in `package.json`
> Add `--hot --inline` to enable [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/)
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

module.exports = {
  
  plugins: [
    new HtmlWebpackPlugin({         
      template: './assets/index.html',  // instead of creating a new file, use the template
    })
  ]
};
```
