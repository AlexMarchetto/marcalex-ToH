export class Weapon {
  private _id: number;
  private _name: string;
  private _attack: number;
  private _dodge: number;
  private _damage: number;
  private _hp: number;


  constructor(id: number, name: string, attack: number, dodge: number, damage: number, hp: number) {
    this._id = id;
    this._name = name;
    this._attack = attack;
    this._dodge = dodge;
    this._damage = damage;
    this._hp = hp;
  }

  // Méthode pour valider si la répartition des points est correcte
  isValid(): boolean {
    const totalPoints = this._attack + this._dodge + this._damage + this._hp;
    return totalPoints === 0 &&
      this.isPointValid(this.attack) &&
      this.isPointValid(this.dodge) &&
      this.isPointValid(this.damage) &&
      this.isPointValid(this.hp);
  }

  // Méthode pour calculer les points restants à attribuer
  remainingPoints(): number {
    return -(this._attack + this._dodge + this._damage + this._hp);
  }

  //Méthode pour vérifier si la valeur des point est correcte (entre -5 et +5)
  isPointValid(point: number): boolean {
    return point >= -5 && point <= 5;
  }

  // GETTERS AND SETTERS OF ATTRIBUTES
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get attack(): number {
    return this._attack;
  }

  set attack(value: number) {
    this._attack = value;
  }

  get dodge(): number {
    return this._dodge;
  }

  set dodge(value: number) {
    this._dodge = value;
  }

  get damage(): number {
    return this._damage;
  }

  set damage(value: number) {
    this._damage = value;
  }

  get hp(): number {
    return this._hp;
  }

  set hp(value: number) {
    this._hp = value;
  }
}
