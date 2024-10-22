import { Component } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-erreur-404',
  standalone: true,
  imports: [],
  templateUrl: './erreur-404.component.html',
  styleUrl: './erreur-404.component.css'
})
export class Erreur404Component {

  constructor(private location : Location) {
  }

  goBack(): void {
    this.location.back();
  }

}
