import './../../assets/styles/hero-container.scss';
let Hero = require('./../models/Hero').Hero;

function formatStatTitle(title) {
  return title.charAt(1).toUpperCase() + title.slice(2);
}

export class HeroView {
  constructor(hero) {
    this._hero = hero;
  }

  render() {
    const name = document.createElement('h3');
    const nameTextContent = document.createTextNode(this._hero.name);
    name.setAttribute('class', 'hero-name');
    name.appendChild(nameTextContent);

    const image = document.createElement('img');
    image.src = require('./../../assets/images/' + this._hero.image);

    const powerContainer = document.createElement('div');
    powerContainer.setAttribute('class', 'power-container');

    Object.entries(this._hero.powerstats).forEach((stat) => {
      const statTitle = document.createElement('span');
      statTitle.setAttribute('class', 'stat-title');
      const statTitleTextContext = document.createTextNode(formatStatTitle(stat[0]));
      statTitle.appendChild(statTitleTextContext);

      const value = document.createElement('span');
      value.setAttribute('class', 'stat-value');
      const valueTextContext = document.createTextNode(stat[1]);
      value.appendChild(valueTextContext);

      const statContainer = document.createElement('div');
      statContainer.setAttribute('class', 'stat-container');
      statContainer.appendChild(statTitle);
      statContainer.appendChild(value);

      powerContainer.appendChild(statContainer);
    });

    const heroContainer = document.createElement('div');
    heroContainer.setAttribute('class', 'hero-container');

    heroContainer.appendChild(image);
    heroContainer.appendChild(name);
    
    heroContainer.appendChild(powerContainer);

    return heroContainer;
  }
}