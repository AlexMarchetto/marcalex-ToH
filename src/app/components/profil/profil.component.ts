import {Component, OnInit} from '@angular/core';
import {Hero} from "../../data/hero.model";
import {HeroService} from "../../services/hero/hero.service";
import {WeaponService} from "../../services/weapon/weapon.service";
import {NgForOf} from "@angular/common";
import {Weapon} from "../../data/weapon.model";
import {first, Observable} from "rxjs";

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  heroes: Hero[] = []

  constructor(private heroService: HeroService, private weaponService: WeaponService) {}

  ngOnInit() {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }




}
