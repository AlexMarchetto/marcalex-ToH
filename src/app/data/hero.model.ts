export class Hero {
  constructor(
    public id: number,
    public name: string,
    public attack: number,
    public dodge: number,
    public damage: number,
    public hp: number
  ) {}

  // Méthode pour valider si la répartition des points est correcte
  isValid(): boolean {
    const totalPoints = this.attack + this.dodge + this.damage + this.hp;
    return totalPoints <= 40 && this.attack >= 1 && this.dodge >= 1 && this.damage >= 1 && this.hp >= 1;
  }

  // Méthode pour calculer les points restants à attribuer
  remainingPoints(): number {
    return 40 - (this.attack + this.dodge + this.damage + this.hp);
  }
}
