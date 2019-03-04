export class PowerStat {
  constructor(intelligence, strength, speed) {
    this._intelligence = intelligence;
    this._strength = strength;
    this._speed = speed;
  }

  get intelligence() {
  	return this._intelligence;
  }

  get strength() {
  	return this._strength;
  }

  get speed() {
  	return this._speed;
  }
}