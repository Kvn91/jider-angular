import { Component, output, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-scenario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-scenario.component.html',
})
export class AddScenarioComponent {
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  title = '';
  description = '';

  addScenario = output<{ title: string; description: string }>();

  submitForm() {
    if (this.title.trim() && this.description.trim()) {
      this.addScenario.emit({
        title: this.title,
        description: this.description,
      });
      this.form().nativeElement.reset();
    }
  }
}
