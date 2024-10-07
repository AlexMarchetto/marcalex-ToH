import {Component, Input, OnInit} from '@angular/core';
import {Weapon} from "../../data/weapon.model";
import {ActivatedRoute} from "@angular/router";
import {WeaponService} from "../../services/weapon/weapon.service";
import {Location, NgIf, UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-weapon-editor',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule
  ],
  templateUrl: './weapon-editor.component.html',
  styleUrl: './weapon-editor.component.css'
})
export class WeaponEditorComponent implements OnInit{
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
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.weaponService.getWeapon(id)
      .subscribe((weapon => this.weapon = weapon))
  }

  update(name: string, attack:number, dodge:number, damage: number, hp:number):void {
    if (this.weapon){
      this.weapon.name = name;
      this.weapon.attack = attack;
      this.weapon.dodge = dodge;
      this.weapon.damage = damage;
      this.weapon.hp = hp;

      // Vérifier si le héros est valide après la mise à jour
      if (this.weapon.isValid()) {
        // Si le héros est valide, appeler le service pour sauvegarder les modifications
        this.weaponService.updateWeapon(this.weapon)
          .subscribe(() => this.goBack());
      } else {
        // Gérer le cas où le héros n'est pas valide (par exemple, afficher un message d'erreur)
        console.error('Invalid weapon: total points must not equal 0 and each attribute must be between -5 and 5');
      }
    }


  }

  goBack(): void {
    this.location.back();
  }
}