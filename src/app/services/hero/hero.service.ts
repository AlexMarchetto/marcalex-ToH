import {Injectable} from '@angular/core';
import {HEROES} from '../../data/mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message/message.service';
import {Hero} from "../../data/hero.model";
import {collection, collectionData, doc, docData, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private static url = 'Heroes';

  constructor(private messageService: MessageService, private firestore: Firestore) { }

  getHeroes(): Observable<Hero[]> {

    const heroCollection = collection(this.firestore, HeroService.url)
    return collectionData(heroCollection, {idField: 'id'}) as Observable<Hero[]>
  }

  getHero(id: string | null): Observable<Hero> {
    const heroDoc = doc(this.firestore, HeroService.url + "/" + id);
    return docData(heroDoc, {idField: 'id'}) as Observable<Hero>;
  }

  updateHero(hero: Hero): Observable<any> {
    const index = HEROES.findIndex(h => h.id === hero.id);
    if (index !== -1) {
      HEROES[index] = {
        id: hero.id,
        name: hero.name,
        attack: hero.attack,
        dodge: hero.dodge,
        damage: hero.damage,
        hp: hero.hp
      };
      this.messageService.add(`HeroService: updated hero id=${hero.id}`);
    }
    return of(null);
  }


}

