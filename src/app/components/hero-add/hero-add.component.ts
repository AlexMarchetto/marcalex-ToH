import { Component, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../../services/hero/hero.service";
import { Location, NgIf, UpperCasePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Hero } from "../../data/hero.model";
import { MessageService } from "../../services/message/message.service";

@Component({
  selector: 'app-hero-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    UpperCasePipe
  ],
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.css']  // Correction ici
})
export class HeroAddComponent {
  @Input() hero?: Hero = new Hero('', '', 1, 1, 1, 1);

  constructor(
    private heroService: HeroService,
    private location: Location
  ) {}

  add(): void {
    if (this.hero) {
      if (!this.hero.name.trim()) {
        return;
      }
      if (this.hero.isValid()){
        this.heroService.addHero(this.hero)
          .then(() => {
            this.hero = new Hero('', '', 1, 1, 1, 1);  // Réinitialisation du formulaire après l'ajout
            this.goBack();
          })
          .catch(error => {
            console.error("Error adding hero: ", error);
          });
      }else {
        alert("Hero not valid");
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
