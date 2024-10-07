import {Component, OnInit} from '@angular/core';
import {Hero} from "../../data/hero.model";
import {HeroService} from "../../services/hero/hero.service";
import {Weapon} from "../../data/weapon.model";
import {WeaponService} from "../../services/weapon/weapon.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.css'
})
export class CustomComponent implements OnInit{
  heroes: Hero[] = [];
  weapons: Weapon[] = [];

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
}
