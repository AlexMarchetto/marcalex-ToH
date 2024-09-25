import {Injectable} from '@angular/core';
import {HeroInterface} from '../data/heroInterface';
import {HEROES} from '../data/mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {Hero} from "../data/hero.model";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<HeroInterface[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<HeroInterface> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  getHeroesClass(): Observable<Hero[]> {
    const heroes = HEROES.map(hero => new Hero(hero.id,hero.name, hero.attack, hero.dodge, hero.damage, hero.hp))
    return of(heroes)
  }

}

