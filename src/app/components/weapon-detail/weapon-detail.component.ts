import {Component, Input, OnInit} from '@angular/core';
import {Weapon} from "../../data/weapon.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {WeaponService} from "../../services/weapon/weapon.service";
import {Location, NgIf, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-weapon-detail',
  standalone: true,
  imports: [
    UpperCasePipe,
    RouterLink,
    NgIf
  ],
  templateUrl: './weapon-detail.component.html',
  styleUrl: './weapon-detail.component.css'
})
export class WeaponDetailComponent implements OnInit{
  @Input() weapon?: Weapon;
  constructor(
    private route : ActivatedRoute,
    private weaponService : WeaponService,
    private location : Location,
  ) {}

  ngOnInit(): void{
    this.getWeapon();
  }

  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.weaponService.getWeapon(id)
      .subscribe((weapon => this.weapon = weapon))
  }

  goBack(): void {
    this.location.back();
  }

}
