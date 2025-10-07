import { Component, input, output } from '@angular/core';

import { CardComponent } from '../card/card.component';
import { Scenario } from '../../models/scenario.model';

@Component({
  selector: 'app-card-list',
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  scenarios = input.required<Scenario[]>();
  deleteScenario = output<string>();

  onDeleteScenario(_id: string) {
    this.deleteScenario.emit(_id);
  }
}
