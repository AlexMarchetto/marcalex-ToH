import { Injectable } from '@angular/core';
import {MessageService} from "../message/message.service";
import {Observable, of} from "rxjs";
import {Weapon} from "../../data/weapon.model";
import {WEAPONS} from "../../data/mock-weapons";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(private messageService: MessageService) { }

  getWeapons(): Observable<Weapon[]> {
    //Création d'une nouvelle instance pour chaque arme
    const weapons = WEAPONS.map(weapon => new Weapon(weapon.id, weapon.name, weapon.attack,weapon.dodge,weapon.damage,weapon.hp));
    this.messageService.add('WeaponService : fetched weapons');
    return of(weapons);
  }

  getWeapon(id: number): Observable<Weapon> {
    const weapon = WEAPONS.find(hero => hero.id === id);
    if (weapon) {
      // Si l'arme est trouvé, on crée une nouvelle instance
      this.messageService.add(`WeaponService : fetched weapon id=${id}`);
      const weaponObject = new Weapon(weapon.id, weapon.name, weapon.attack, weapon.dodge, weapon.damage, weapon.hp);
      return of(weaponObject);
    }else{
      //Si l'arme n'est pas trouvée
      this.messageService.add(`WeaponService : could not find weapon id=${id}`);
      return of();
    }
  }

  updateWeapon(weapon: Weapon): Observable<any> {
    const index = WEAPONS.findIndex(w => w.id === weapon.id);
    if (index !== -1) {
      WEAPONS[index] = {
        id: weapon.id,
        name: weapon.name,
        attack: weapon.attack,
        dodge: weapon.dodge,
        damage: weapon.damage,
        hp: weapon.hp
      };
      this.messageService.add(`WeaponService: updated weapon id=${weapon.id}`);
    }
    return of(null);

  }
}
