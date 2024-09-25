import { Routes } from '@angular/router';
import {HeroesComponent} from "./components/heroes/heroes.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HeroDetailComponent} from "./components/hero-detail/hero-detail.component";
import {HeroEditorComponent} from "./components/hero-editor/hero-editor.component";

export const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: 'edit/:id', component: HeroEditorComponent}
];
