import { Component, Input } from '@angular/core';
import {HeroInterface} from "../../data/heroInterface";
import {NgIf, UpperCasePipe, Location} from "@angular/common";
import {FormsModule, NgModel} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../services/hero.service";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
    NgIf,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
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
