import './../../assets/styles/hero-container.scss';
let Hero = require('./../models/Hero').Hero;

export class HeroView {
  constructor(hero) {
    this._hero = hero;
  }

  render() {
    const name = document.createElement('h3');
    const nameTextContent = document.createTextNode(this._hero.name);
    name.appendChild(nameTextContent);

    const powerSectionTitle = document.createElement('p');
    const powerSectionTitleTextContext = document.createTextNode("Powers: ");
    powerSectionTitle.appendChild(powerSectionTitleTextContext);

    const powerSection = document.createElement('ul');

    const intelligenceStat = document.createElement('li');
    const intelligenceStatTextContext = document.createTextNode("Intelligence: " + this._hero.powerstats.intelligence);
    intelligenceStat.appendChild(intelligenceStatTextContext);
    powerSection.appendChild(intelligenceStat);

    const strengthStat = document.createElement('li');
    const strengthStatTextContext = document.createTextNode("Strength: " + this._hero.powerstats.strength);
    strengthStat.appendChild(strengthStatTextContext);
    powerSection.appendChild(strengthStat);

    const speedStat = document.createElement('li');
    const speedStatTextContext = document.createTextNode("Speed: " + this._hero.powerstats.speed);
    speedStat.appendChild(speedStatTextContext);
    powerSection.appendChild(speedStat);

    const heroContainer = document.createElement('div');
    heroContainer.setAttribute('class', 'hero-container');

    heroContainer.appendChild(name);
    heroContainer.appendChild(powerSectionTitle);
    heroContainer.appendChild(powerSection);

    return heroContainer;
  }
}