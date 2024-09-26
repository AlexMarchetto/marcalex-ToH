import {Component, OnInit} from '@angular/core';
import {Weapon} from "../../data/weapon.model";
import {WeaponService} from "../../services/weapon/weapon.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-weapons',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.css'
})
export class WeaponsComponent implements OnInit{
  weapons: Weapon[] = [];

  constructor(private weaponService: WeaponService) { }

  ngOnInit(): void{
    this.getWeapons();
  }

  getWeapons():void {
    this.weaponService.getWeapons().subscribe(weapon => this.weapons = weapon);
  }


}
