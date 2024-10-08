import {Component, Input} from '@angular/core';
import {Weapon} from "../../data/weapon.model";
import {WeaponService} from "../../services/weapon/weapon.service";
import {Location, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-weapon-add',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './weapon-add.component.html',
  styleUrl: './weapon-add.component.css'
})
export class WeaponAddComponent {
  @Input() weapon?: Weapon = new Weapon('','',0,0,0,0);

  constructor(
    private weaponService: WeaponService,
    private location: Location,
  ) {}

  add(): void {
    if (this.weapon){
      if (!this.weapon.name.trim()) {
        return;
      }
      if (this.weapon.isValid()) {
        this.weaponService.addWeapon(this.weapon)
          .then(() => {
            this.weapon = new Weapon('','',0,0,0,0);
            this.goBack();
          }).catch(error => {
            console.log("Error adding weapon", error);
        })
      }else{
        alert("Weapon not valid");
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

}
