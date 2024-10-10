import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero/hero.service';
import {WeaponService} from "../../services/weapon/weapon.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Hero} from "../../data/hero.model";
import {Weapon} from "../../data/weapon.model";
import {PopUpComponent} from "../pop-up/pop-up.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    PopUpComponent
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  weapons: Weapon[] = [];
  haveFavoritesHeroes: boolean = true;
  haveFavoritesWeapons: boolean = true;
  showPopUp: boolean = true;

  constructor(private heroService: HeroService, private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getWeapons()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        // Filtrer les héros où isFavorite est true
        this.heroes = heroes.filter(hero => hero.isFavorite);
        if (this.heroes.length == 0){
          this.haveFavoritesHeroes = false;
        }
      });
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => {
        // Filtrer les weapons quand isFavorite est true
        this.weapons = weapons.filter(weapon => weapon.isFavorite);
        if (this.weapons.length == 0){
          this.haveFavoritesWeapons = false;
        }
      })
  }

  // Fonction pour cacher le pop-up
  hidePopUp(): void {
    this.showPopUp = false;
  }
}
