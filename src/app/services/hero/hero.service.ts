import {Injectable} from '@angular/core';
import {HEROES} from '../../data/mock-heroes';
import {map, Observable, of} from 'rxjs';
import {MessageService} from '../message/message.service';
import {Hero} from "../../data/hero.model";
import {collection, collectionData, doc, docData, Firestore, updateDoc} from "@angular/fire/firestore";

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
      hp: hero.hp};
    updateDoc(heroDoc, newHeroJSON)
      .then(() => {
        this.messageService.add(`HeroService: updated hero id=${hero.id}`)
      }).catch(error => {
        console.error("Error updating hero: ", error);
        this.messageService.add(`HeroService: failed to update hero id=${hero.id}`)
    })
  }


}

