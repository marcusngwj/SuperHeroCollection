let Hero = require('./models/Hero').Hero;
let PowerStat = require('./models/PowerStat').PowerStat;
let SortButton = require('./components/SortButton').SortButton;
let HeroAlbumView = require('./components/HeroAlbumView').HeroAlbumView;

function parseHeroData(dataArray=[]) {
  return dataArray.map((dataItem) => {
    const powerstats = dataItem.powerstats;
    const heroPower = new PowerStat(powerstats.intelligence, powerstats.strength, powerstats.speed);
    return new Hero(dataItem.id, dataItem.name, heroPower, dataItem.image, dataItem.publisher);
  });
}

function getPublishers(dataArray=[]) {
  let allPublishers = dataArray.map((dataItem)=>{
    return dataItem.publisher;
  });
  return [...new Set(allPublishers)];
}

function getHerosFilterByPublisher(heros, publisher) {
  return heros.filter((hero) => {
    return hero.publisher === publisher;
  });
}

function sortByIntelligenceDesc(hero1, hero2) {
  return hero2.powerstats.intelligence - hero1.powerstats.intelligence;
}

function sortByIntelligenceAsc(hero1, hero2) {
  return hero1.powerstats.intelligence - hero2.powerstats.intelligence;
}

export class App {
  constructor(heroDataArray) {
    this._heros = parseHeroData(heroDataArray);
    this._publishers = getPublishers(heroDataArray);

    this._sortAlbums = this._sortAlbums.bind(this);
    this._renderHeros = this._renderHeros.bind(this);
  }

  _sortAlbums(sortFunction) {
    this._heros.sort(sortFunction);
    this._renderHeros();
  }

  _renderHeros() {
    const albumContainer = document.querySelector('#album-container');
    albumContainer.innerHTML = '';

    this._publishers.forEach((publisher) => {
      const filteredHeros = getHerosFilterByPublisher(this._heros, publisher);

      const heroAlbumView = new HeroAlbumView(publisher, filteredHeros).render();
      albumContainer.appendChild(heroAlbumView);
    });
  }

  render() {
    const rootContainer = document.querySelector('#root');

    const descIntButton = new SortButton("By intelligence, descending", this._sortAlbums, sortByIntelligenceDesc);
    const ascIntButton = new SortButton("By intelligence, ascending", this._sortAlbums, sortByIntelligenceAsc);

    rootContainer.appendChild(descIntButton.render());
    rootContainer.appendChild(ascIntButton.render());

    const albumContainer = document.createElement('div');
    albumContainer.setAttribute('id', 'album-container');
    rootContainer.appendChild(albumContainer);

    this._renderHeros();
  }
}