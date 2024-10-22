import {Component, Input, OnInit} from '@angular/core';
import {NgIf, UpperCasePipe, Location} from "@angular/common";
import {FormsModule, NgModel} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HeroService} from "../../services/hero/hero.service";
import {HeroEditorComponent} from "../hero-editor/hero-editor.component";
import {Hero} from "../../data/hero.model";
import {WeaponService} from "../../services/weapon/weapon.service";
import {first} from "rxjs";

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
  weaponName?: string;
  constructor(
    private route : ActivatedRoute,
    private heroService: HeroService,
    private location : Location,
    private weaponService : WeaponService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.setWeaponName();
      });
  }

  goBack(): void {
    this.location.back();
  }

  setWeaponName(): void{
    if (this.hero){
      if (this.hero.weapon != null){
        this.weaponService.getWeapon(this.hero.weapon).pipe(first())
          .subscribe(weapon => this.weaponName = weapon.name)

      }
    }
  }
}
