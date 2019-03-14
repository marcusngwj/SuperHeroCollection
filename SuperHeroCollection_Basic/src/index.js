let heroData = require('./../assets/data/data').heroData;
let App = require('./../src/App').App;

const app = new App(heroData.getData());
app.render();