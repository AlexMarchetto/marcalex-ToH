import { Component, OnInit } from '@angular/core';
import { Hero } from "../../data/hero.model";
import { HeroService } from "../../services/hero/hero.service";
import { WeaponService } from "../../services/weapon/weapon.service";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import { Weapon } from "../../data/weapon.model";
import { first } from "rxjs";
import { Profil } from "../../data/profil.model";
import { RouterLink } from "@angular/router";
import {FormsModule} from "@angular/forms";

type HeroWeaponAttribute = 'attack' | 'dodge' | 'damage' | 'hp';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    UpperCasePipe,
    FormsModule,
    NgIf
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})

export class ProfilComponent implements OnInit {
  heroes: Hero[] = [];
  profils: Profil[] = [];
  filteredProfils: Profil[] = [];

  // Activer ou désactiver le tri et le filtrage
  isFilterActive = false;
  isSortActive = false;

  filter: { attribute: HeroWeaponAttribute, value: number, operator: string } = {
    attribute: 'attack',
    value: 0,
    operator: 'greaterThan'
  };

  sort: { attribute: HeroWeaponAttribute, direction: 'asc' | 'desc' } = {
    attribute: 'attack',
    direction: 'asc'
  };

  constructor(private heroService: HeroService, private weaponService: WeaponService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes.filter(hero => hero.weapon || hero.weapon != "null");
      this.linkWeapons();
    });
  }

  linkWeapons() {
    this.profils = [];
    for (let hero of this.heroes) {
      const weaponId = hero.weapon;
      this.weaponService.getWeapon(weaponId).pipe(first()).subscribe(weapon => {
        const profil = new Profil(hero, weapon);
        this.profils.push(profil);
      });
    }
    this.filteredProfils = this.profils; // Affiche tous les profils par défaut
  }

  // Filtrage des profils en fonction de l'attribut et de l'opérateur
  applyFilter() {
    if (!this.isFilterActive) {
      this.filteredProfils = [...this.profils]; // Affiche tous les profils si le filtre est désactivé
    } else {
      this.filteredProfils = this.profils.filter(profil => {
        let attributeValue = profil.hero[this.filter.attribute] + profil.weapon[this.filter.attribute];
        switch (this.filter.operator) {
          case 'greaterThan':
            return attributeValue > this.filter.value;
          case 'lessThan':
            return attributeValue < this.filter.value;
          case 'equal':
            return attributeValue === this.filter.value;
          default:
            return true;
        }
      });
    }
    // Applique le tri si activé après filtrage
    if (this.isSortActive) {
      this.sortProfiles();
    }
  }

  // Tri des profils
  sortProfiles() {
    if (!this.isSortActive) {
      this.filteredProfils = [...this.filteredProfils]; // Aucun tri si le tri est désactivé
    } else {
      this.filteredProfils.sort((a, b) => {
        const aValue = a.hero[this.sort.attribute] + a.weapon[this.sort.attribute];
        const bValue = b.hero[this.sort.attribute] + b.weapon[this.sort.attribute];
        return this.sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }
  }
}
