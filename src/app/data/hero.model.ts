export class Hero {
  private _id: number;
  private _name: string;
  private _attack: number;
  private _dodge: number;
  private _damage: number;
  private _hp: number;

  constructor(id: number, name: string, attack:number, dodge: number, damage: number, hp: number) {
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
    return totalPoints <= 40 && this._attack >= 1 && this._dodge >= 1 && this._damage >= 1 && this._hp >= 1;
  }

  // Méthode pour calculer les points restants à attribuer
  remainingPoints(): number {
    return 40 - (this._attack + this._dodge + this._damage + this._hp);
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
