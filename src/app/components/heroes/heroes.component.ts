import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HEROES} from '../../data/mock-heroes';
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import { HeroService } from '../../services/hero/hero.service';
import {MessageService} from "../../services/message/message.service";
import {RouterLink} from "@angular/router";
import {Hero} from "../../data/hero.model";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe, FormsModule, NgForOf, NgIf, HeroDetailComponent, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit{
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
