import { Component, input, output } from '@angular/core';

import { CardComponent } from '../../taches/card/card.component';
import { Tache } from '../tache.model';

@Component({
  selector: 'app-card-list',
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  taches = input.required<Tache[]>();
}
