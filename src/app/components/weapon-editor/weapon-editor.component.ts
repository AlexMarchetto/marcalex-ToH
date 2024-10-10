import {Component, Input, OnInit} from '@angular/core';
import {Weapon} from "../../data/weapon.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {WeaponService} from "../../services/weapon/weapon.service";
import {Location, NgIf, UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { first } from 'rxjs';

@Component({
  selector: 'app-weapon-editor',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './weapon-editor.component.html',
  styleUrl: './weapon-editor.component.css'
})
export class WeaponEditorComponent implements OnInit{
  @Input() weapon?: Weapon;
  minimum = -5;
  maximum = 5;
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
    this.weaponService.getWeapon(id).pipe(first())
      .subscribe((weapon => this.weapon = weapon))
  }

  update(name: string, attack:number, dodge:number, damage: number, hp:number, isFavorite: boolean):void {
    if (this.weapon){
      this.weapon.name = name;
      this.weapon.attack = attack;
      this.weapon.dodge = dodge;
      this.weapon.damage = damage;
      this.weapon.hp = hp;
      this.weapon.isFavorite = isFavorite;

      // Vérifier si le héros est valide après la mise à jour
      if (this.weapon.isValid()) {
        // Si le héros est valide, appeler le service pour sauvegarder les modifications
        this.weaponService.updateWeapon(this.weapon)
        this.goBack()
      } else {
        // Gérer le cas où le héros n'est pas valide (par exemple, afficher un message d'erreur)
        console.error('Invalid weapon: total points must not equal 0 and each attribute must be between -5 and 5');
      }
    }
  }

  delete(): void{
    if (this.weapon){
      this.weaponService.deleteWeapon(this.weapon.id).then(() => {
        this.weapon = undefined;
      })
    }
  }

  goBack(): void {
    this.location.back();
  }
}
