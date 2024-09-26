import {Injectable} from '@angular/core';
import {HEROES} from '../../data/mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message/message.service';
import {Hero} from "../../data/hero.model";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    //Création d'une nouvelle instance pour chaque héro
    const heroes = HEROES.map(hero => new Hero(hero.id,hero.name, hero.attack, hero.dodge, hero.damage, hero.hp));
    this.messageService.add('HeroService: fetched heroes');
    return of(heroes);
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(hero => hero.id === id);
    if (hero) {
      // Si le héros est trouvé, créer une nouvelle instance de Hero
      this.messageService.add(`HeroService: fetched hero id=${id}`);
      const heroObject = new Hero(hero.id, hero.name, hero.attack, hero.dodge, hero.damage, hero.hp);
      return of(heroObject);
    } else {
      // Si le héros n'est pas trouvé, gérer l'erreur
      this.messageService.add(`HeroService: could not find hero id=${id}`);
      return of();  // Retourne un Observable vide ou tu peux lever une erreur
    }
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

