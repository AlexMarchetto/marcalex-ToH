import {Component, OnInit} from '@angular/core';
import {Hero} from "../../data/hero.model";
import {HeroService} from "../../services/hero/hero.service";
import {Weapon} from "../../data/weapon.model";
import {WeaponService} from "../../services/weapon/weapon.service";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    UpperCasePipe
  ],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.css'
})
export class CustomComponent implements OnInit{
  heroes: Hero[] = [];
  weapons: Weapon[] = [];

  selectedHero: Hero | null = null;
  selectedWeapon: Weapon | null = null;

  constructor(private heroService: HeroService, private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getWeapons();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  getWeapons():void {
    this.weaponService.getWeapons().subscribe(weapon => this.weapons = weapon);
  }

  selectHero(hero: Hero): void {
    if (this.selectedHero === hero){
      this.selectedHero = null;
    }else{
      this.selectedHero = hero;
    }
  }

  // Fonction de sélection pour les armes
  selectWeapon(weapon: Weapon): void {
    if (this.selectedWeapon === weapon){
      this.selectedWeapon = null;
    }else{
      this.selectedWeapon = weapon;
    }
  }
}
