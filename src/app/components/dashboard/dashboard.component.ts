import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero/hero.service';
import {WeaponService} from "../../services/weapon/weapon.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Hero} from "../../data/hero.model";
import {Weapon} from "../../data/weapon.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  weapons: Weapon[] = []

  constructor(private heroService: HeroService, private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getWeapons()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons.slice(1,5))
  }
}
