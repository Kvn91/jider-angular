import { Component, input, output } from '@angular/core';
import { Tache } from '../../taches/tache.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
})
export class CardComponent {
  tache = input.required<Tache>();
}
