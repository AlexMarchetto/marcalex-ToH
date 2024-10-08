import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {MessageService} from '../message/message.service';
import {Hero} from "../../data/hero.model";
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
export class HeroService {

  private static url = 'Heroes';

  constructor(private messageService: MessageService, private firestore: Firestore) { }

  getHeroes(): Observable<Hero[]> {
    const heroCollection = collection(this.firestore, HeroService.url)
    this.messageService.add('HeroService: fetched heroes')
    return collectionData(heroCollection, { idField: 'id' }).pipe(
      map(heroesData => {
        // Cast explicite pour chaque élément du tableau heroesData
        return (heroesData as Hero[]).map(heroData => new Hero(
          heroData.id,
          heroData.name,
          heroData.attack,
          heroData.dodge,
          heroData.damage,
          heroData.hp
        ));
      })
    ) as Observable<Hero[]>;
  }

  getHero(id: string | null): Observable<Hero> {
    const heroDoc = doc(this.firestore, HeroService.url + "/" + id);
    return docData(heroDoc, { idField: 'id' }).pipe(
      map(heroData => {
        // Cast heroData pour être du type Hero
        const data = heroData as Hero;
        this.messageService.add(`heroService: fetched hero id=${data.id}`);
        return new Hero(
          data.id,
          data.name,
          data.attack,
          data.dodge,
          data.damage,
          data.hp
        );
      })
    ) as Observable<Hero>;
  }

  updateHero(hero: Hero): void {
    const heroDoc = doc(this.firestore, HeroService.url + "/" + hero.id);
    let newHeroJSON = {
      name: hero.name,
      attack: hero.attack,
      dodge: hero.dodge,
      damage: hero.damage,
      hp: hero.hp
    };
    updateDoc(heroDoc, newHeroJSON)
      .then(() => {
        this.messageService.add(`HeroService: updated hero id=${hero.id}`)
      }).catch(error => {
        console.error("Error updating hero: ", error);
        this.messageService.add(`HeroService: failed to update hero id=${hero.id}`)
    });
  }

  async deleteHero(id: string): Promise<void>{
    const heroDocument = doc(this.firestore, HeroService.url + "/" + id);
    return deleteDoc(heroDocument)
      .then(() => {
        this.messageService.add(`HeroService: deleted hero id=${id}`);
      }).catch(error => {
        console.log("Error deleting hero: ", error)
        this.messageService.add(`HeroService: failed to delete hero id=${id}`);
      });
  }

  async addHero(hero: Hero): Promise<void> {
    const heroCollection = collection(this.firestore, HeroService.url);
    const newHeroJSON = {
      name: hero.name,
      attack: hero.attack,
      dodge: hero.dodge,
      damage: hero.damage,
      hp: hero.hp
    };

    return addDoc(heroCollection, newHeroJSON)
      .then(() => {
        console.log(`Hero added: ${hero.name}`);
      })
      .catch((error) => {
        console.error("Error adding hero: ", error);
        throw error;  // On renvoie l'erreur pour que le composant puisse la traiter
      });
  }
}

