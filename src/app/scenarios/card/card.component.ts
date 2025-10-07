import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Scenario } from '../../models/scenario.model';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  standalone: true,
})
export class CardComponent {
  scenario = input.required<Scenario>();
  delete = output<void>();

  onDelete() {
    this.delete.emit();
  }
}
