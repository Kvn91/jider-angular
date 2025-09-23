import { Component, output } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-scenario',
  imports: [ReactiveFormsModule],
  templateUrl: './add-scenario.component.html',
})
export class AddScenarioComponent {
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  addScenario = output<{ title: string; description: string }>();

  onSubmit() {
    if (this.form.value.title?.trim() && this.form.value.description?.trim()) {
      this.addScenario.emit({
        title: this.form.value.title,
        description: this.form.value.description,
      });
      this.form.reset;
    }
  }
}
