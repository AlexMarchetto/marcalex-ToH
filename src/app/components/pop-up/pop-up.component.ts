import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  @Input() message: string = ''; // Le message à afficher dans le pop-up
  @Output() close = new EventEmitter<void>(); // Événement déclenché pour fermer le pop-up

  // Fonction pour fermer le pop-up et émettre l'événement de fermeture
  closePopUp(): void {
    this.close.emit();
  }
}
