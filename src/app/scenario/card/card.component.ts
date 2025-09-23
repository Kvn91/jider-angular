import { Component, input, output } from '@angular/core';
import { Scenario } from '../scenario.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
})
export class CardComponent {
  scenario = input.required<Scenario>();
  delete = output<void>();

  onDelete() {
    this.delete.emit();
  }
}
