import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Scenario } from '../scenario.model';

@Component({
  selector: 'app-card-list',
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  scenarios = input.required<Scenario[]>();
  deleteScenario = output<number>();

  onDeleteScenario(id: number) {
    this.deleteScenario.emit(id);
  }
}
