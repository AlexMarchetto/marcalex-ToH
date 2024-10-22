import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HeroService} from "../../services/hero/hero.service";
import {Location, NgIf, UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Hero} from "../../data/hero.model";
import {first} from "rxjs";
import {PopUpComponent} from "../pop-up/pop-up.component";

@Component({
  selector: 'app-hero-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    UpperCasePipe,
    RouterLink,
    PopUpComponent
  ],
  templateUrl: './hero-editor.component.html',
  styleUrl: './hero-editor.component.css'
})
export class HeroEditorComponent implements OnInit{
  @Input() hero?: Hero;
  minimum = 1;
  maximum = 40;
  showPopUpValid: boolean = false;
  showPopUpWrong: boolean = false;

  constructor(
    private route : ActivatedRoute,
    private heroService: HeroService,
    private location : Location,
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.heroService.getHero(id)
      .subscribe(hero => {this.hero = hero;});
  }

  update(name: string, attack:number, dodge:number, damage: number, hp:number, isFavorite: boolean):void {
    if (this.hero){
      this.hero.name = name;
      this.hero.attack = attack;
      this.hero.dodge = dodge;
      this.hero.damage = damage;
      this.hero.hp = hp;
      this.hero.isFavorite = isFavorite;

      // Vérifier si le héros est valide après la mise à jour
      if (this.hero.isValid()) {
        // Si le héros est valide, appeler le service pour sauvegarder les modifications
        this.heroService.updateHero(this.hero);
        this.showPopUpValid = true;
      } else {
        // Gérer le cas où le héros n'est pas valide (par exemple, afficher un message d'erreur)
        this.showPopUpWrong = true;
        console.error('Invalid hero: total points must not exceed 40 and each attribute must be at least 1');
      }
    }
  }

  delete():void {
    if (this.hero){
      this.heroService.deleteHero(this.hero.id).then(() => {
        this.hero = undefined;
      })
    }
  }

  goBack(): void {
    this.location.back();
  }

  hidePopUp(isUpdateOk: boolean = true): void {
    this.showPopUpValid = false;
    this.showPopUpWrong = false;
    if (isUpdateOk){
      this.goBack()
    }
  }

  protected readonly Math = Math;
}
