import { Injectable } from '@angular/core';
import {MessageService} from "../message/message.service";
import {map, Observable, of} from "rxjs";
import {Weapon} from "../../data/weapon.model";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  private static url= 'Weapons';

  constructor(private messageService: MessageService, private firestore: Firestore) { }

  getWeapons(): Observable<Weapon[]> {
    const weaponCollection = collection(this.firestore, WeaponService.url);
    this.messageService.add('WeaponService: fetched weapons');
    return collectionData(weaponCollection, { idField: 'id'}).pipe(
      map(weaponData => {
        return (weaponData as Weapon[]).map(weaponData => new Weapon(
          weaponData.id,
          weaponData.name,
          weaponData.attack,
          weaponData.dodge,
          weaponData.damage,
          weaponData.hp
        ));
      })
    ) as Observable<Weapon[]>
  }

  getWeapon(id: string | null): Observable<Weapon> {
    const weaponDoc = doc(this.firestore, WeaponService.url +"/"+id);
    return docData(weaponDoc, {idField:'id'}).pipe(
      map(weaponData => {
        const data = weaponData as Weapon;
        this.messageService.add(`WeaponService: fetched weapon id=${data.id}`);
        return new Weapon(
          data.id,
          data.name,
          data.attack,
          data.dodge,
          data.damage,
          data.hp
        );
      })
    ) as Observable<Weapon>
  }

  updateWeapon(weapon: Weapon): void {
    const weaponDoc = doc(this.firestore, WeaponService.url +"/"+weapon.id);
    let newWeaponJSON = {
      name: weapon.name,
      attack: weapon.attack,
      dodge: weapon.dodge,
      damage: weapon.damage,
      hp: weapon.hp
    };
    updateDoc(weaponDoc, newWeaponJSON)
      .then(() => {
        this.messageService.add(`WeaponService: updated weapon id=${weapon.id}`)
      }).catch(error => {
        console.log("Error deleting weapon: ", error)
      this.messageService.add(`WeaponService: failed to update weapon id=${weapon.id}`)
    })
  }

  async deleteWeapon(id: string): Promise<void>{
    const weaponDocument = doc(this.firestore, WeaponService.url+"/"+id);
    return deleteDoc(weaponDocument)
      .then(()=> {
        this.messageService.add(`WeaponService: deleted weapon id=${id}`);
      }).catch(error => {
        console.log("Error deleting weapon: ", error);
        this.messageService.add(`WeponService: failed to delete weapon id=${id}`);
      })
  }

  async addWeapon(weapon: Weapon): Promise<void>{
    const weaponCollection = collection(this.firestore, WeaponService.url);
    const newWeaponJSON = {
      name: weapon.name,
      attack: weapon.attack,
      dodge: weapon.dodge,
      damage: weapon.damage,
      hp: weapon.hp
    };

    return addDoc(weaponCollection, newWeaponJSON)
      .then(() => {
        console.log(`Weapon added: ${weapon.name}`);
      }).catch((error) => {
        console.error('Error adding weapon', error);
      })
  }
}
