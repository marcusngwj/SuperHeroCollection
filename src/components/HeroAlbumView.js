import './../../assets/styles/hero-album.scss';
let HeroView = require('./../components/HeroView').HeroView;

export class HeroAlbumView {
  constructor(publisher, heros) {
    this._publisher = publisher;
    this._heros = heros;
  }

  render() {
    const publisher = document.createElement('h2');
    const publisherTitleTextContext = document.createTextNode('Super Heroes from \'' + this._publisher + '\'');
    publisher.appendChild(publisherTitleTextContext);
    publisher.classList.add('hero-album-header');

    const album = document.createElement('div');
    album.classList.add('hero-album');

    album.appendChild(publisher);

    this._heros.forEach((hero) => {
      album.appendChild(new HeroView(hero).render());
    });

    return album;
  }
}