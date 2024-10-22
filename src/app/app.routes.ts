import { Routes } from '@angular/router';
import {HeroesComponent} from "./components/heroes/heroes.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HeroDetailComponent} from "./components/hero-detail/hero-detail.component";
import {HeroEditorComponent} from "./components/hero-editor/hero-editor.component";
import {WeaponsComponent} from "./components/weapons/weapons.component";
import {WeaponDetailComponent} from "./components/weapon-detail/weapon-detail.component";
import {WeaponEditorComponent} from "./components/weapon-editor/weapon-editor.component";
import {CustomComponent} from "./components/custom/custom.component";
import {HeroAddComponent} from "./components/hero-add/hero-add.component";
import {WeaponAddComponent} from "./components/weapon-add/weapon-add.component";
import {Erreur404Component} from "./components/erreur-404/erreur-404.component";
import {ProfilComponent} from "./components/profil/profil.component";

export const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'heroes/detail/:id', component: HeroDetailComponent},
  {path: 'heroes/edit/:id', component: HeroEditorComponent},
  {path: 'weapons', component: WeaponsComponent},
  {path: 'weapons/detail/:id', component: WeaponDetailComponent},
  {path: 'weapons/edit/:id', component: WeaponEditorComponent},
  {path: 'custom', component: CustomComponent},
  {path: 'heroes/add', component: HeroAddComponent},
  {path: 'weapons/add', component: WeaponAddComponent},
  {path: 'profil', component: ProfilComponent},
  {path: '**', component: Erreur404Component}
];
