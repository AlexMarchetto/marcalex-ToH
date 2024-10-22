import {Component, OnInit} from '@angular/core';
import {Hero} from "../../data/hero.model";
import {HeroService} from "../../services/hero/hero.service";
import {Weapon} from "../../data/weapon.model";
import {WeaponService} from "../../services/weapon/weapon.service";
import {Location, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PopUpComponent} from "../pop-up/pop-up.component";

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    UpperCasePipe,
    PopUpComponent
  ],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.css'
})
export class CustomComponent implements OnInit{
  heroes: Hero[] = [];
  weapons: Weapon[] = [];

  selectedHero: Hero | null = null;
  selectedWeapon: Weapon | null = null;

  showPopUpValid: boolean = false;
  showPopUpWrong: boolean = false;

  constructor(private heroService: HeroService, private weaponService: WeaponService, private location : Location) { }

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

  link(): void{
    if (this.selectedHero != null && this.selectedWeapon != null){
      if (this.selectedHero.attack + this.selectedWeapon.attack >= 0 && this.selectedHero.dodge + this.selectedWeapon.dodge >= 0 && this.selectedHero.damage + this.selectedWeapon.damage >= 0 && this.selectedHero.hp + this.selectedWeapon.hp >= 0){
        this.selectedHero.weapon = this.selectedWeapon.id;
        this.heroService.updateHero(this.selectedHero);
        this.showPopUpValid = true;
      }else{
        this.showPopUpWrong = true;
      }
    }
  }

  hidePopUp(): void {
    this.showPopUpValid = false;
    this.showPopUpWrong = false;
  }
}
