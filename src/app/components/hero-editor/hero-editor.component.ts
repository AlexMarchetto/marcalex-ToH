import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../services/hero/hero.service";
import {Location, NgIf, UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Hero} from "../../data/hero.model";
import {first} from "rxjs";

@Component({
  selector: 'app-hero-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    UpperCasePipe
  ],
  templateUrl: './hero-editor.component.html',
  styleUrl: './hero-editor.component.css'
})
export class HeroEditorComponent implements OnInit{
  @Input() hero?: Hero;
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
    this.heroService.getHero(id).pipe(first())
      .subscribe(hero => {this.hero = hero;});
  }

  update(name: string, attack:number, dodge:number, damage: number, hp:number):void {
    if (this.hero){
      this.hero.name = name;
      this.hero.attack = attack;
      this.hero.dodge = dodge;
      this.hero.damage = damage;
      this.hero.hp = hp;

      // Vérifier si le héros est valide après la mise à jour
      if (this.hero.isValid()) {
        // Si le héros est valide, appeler le service pour sauvegarder les modifications
        this.heroService.updateHero(this.hero);
        this.goBack()
      } else {
        // Gérer le cas où le héros n'est pas valide (par exemple, afficher un message d'erreur)
        console.error('Invalid hero: total points must not exceed 40 and each attribute must be at least 1');
      }
    }


  }

  goBack(): void {
    this.location.back();
  }
}
