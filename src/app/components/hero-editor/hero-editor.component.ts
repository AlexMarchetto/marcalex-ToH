import {Component, Input} from '@angular/core';
import {HeroInterface} from "../../data/heroInterface";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../services/hero.service";
import {Location, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-hero-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './hero-editor.component.html',
  styleUrl: './hero-editor.component.css'
})
export class HeroEditorComponent {
  @Input() hero?: HeroInterface;
  constructor(
    private route : ActivatedRoute,
    private heroService: HeroService,
    private location : Location,
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);

  }

  goBack(): void {
    this.location.back();
  }
}
