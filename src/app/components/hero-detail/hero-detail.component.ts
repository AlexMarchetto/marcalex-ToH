import {Component, Input, OnInit} from '@angular/core';
import {NgIf, UpperCasePipe, Location} from "@angular/common";
import {FormsModule, NgModel} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HeroService} from "../../services/hero.service";
import {HeroEditorComponent} from "../hero-editor/hero-editor.component";
import {Hero} from "../../data/hero.model";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
    NgIf,
    HeroEditorComponent,
    RouterLink,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit{
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
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back();
  }
}
