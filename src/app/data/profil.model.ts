import {Hero} from "./hero.model";
import {Weapon} from "./weapon.model";

export class Profil{
  private _hero: Hero;
  private _weapon: Weapon;

  constructor(hero: Hero, weapon: Weapon) {
    this._hero = hero;
    this._weapon = weapon;
  }

  get hero(): Hero {
    return this._hero;
  }

  set hero(value: Hero) {
    this._hero = value;
  }

  get weapon(): Weapon {
    return this._weapon;
  }

  set weapon(value: Weapon) {
    this._weapon = value;
  }
}
