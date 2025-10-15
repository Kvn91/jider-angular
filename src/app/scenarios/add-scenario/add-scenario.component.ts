import { Component, output } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface ScenarioForm {
  title: string;
  description: string;
}

@Component({
  selector: 'app-add-scenario',
  imports: [ReactiveFormsModule],
  templateUrl: './add-scenario.component.html',
})
export class AddScenarioComponent {
  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });
  addScenario = output<ScenarioForm>();

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.addScenario.emit(this.form.value as ScenarioForm);
    this.form.reset();
  }
}
