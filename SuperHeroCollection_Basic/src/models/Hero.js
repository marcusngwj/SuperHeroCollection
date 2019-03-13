export class Hero {
  constructor(id, name, powerstats={}, image='', publisher='') {
    this._id = id;
    this._name = name;
    this._powerstats = powerstats;
    this._image = image;
    this._publisher = publisher;
  }

  get id() {
  	return this._id;
  }

  get name() {
  	return this._name;
  }

  get powerstats() {
  	return this._powerstats;
  }

  get image() {
  	return this._image;
  }

  get publisher() {
  	return this._publisher;
  }
}