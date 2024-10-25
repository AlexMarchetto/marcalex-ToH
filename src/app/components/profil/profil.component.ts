import {Component, OnInit} from '@angular/core';
import {Hero} from "../../data/hero.model";
import {HeroService} from "../../services/hero/hero.service";
import {WeaponService} from "../../services/weapon/weapon.service";
import {NgForOf, UpperCasePipe} from "@angular/common";
import {Weapon} from "../../data/weapon.model";
import {first, Observable} from "rxjs";
import {Profil} from "../../data/profil.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    UpperCasePipe
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})

export class ProfilComponent implements OnInit{
  heroes: Hero[] = []
  profils: Profil[] = []

  constructor(private heroService: HeroService, private weaponService: WeaponService) {}

  ngOnInit() {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes.filter(hero => hero.weapon || hero.weapon != "null");
      this.linkWeapons();
    });
  }

  linkWeapons(){
    for(let hero of this.heroes){
      const weaponId = hero.weapon;
      this.weaponService.getWeapon(weaponId).pipe(first()).subscribe(weapon => this.profils.push(new Profil(hero, weapon)));
    }
  }

}
