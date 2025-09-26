import { Component, output } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-tache',
  imports: [ReactiveFormsModule],
  templateUrl: './add-tache.component.html',
})
export class AddTacheComponent {
  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    description: new FormControl('', { validators: [Validators.required] }),
  });
  addTache = output<{ title: string; description: string }>();

  onSubmit() {
    if (this.form.value.title?.trim() && this.form.value.description?.trim()) {
      this.addTache.emit({
        title: this.form.value.title,
        description: this.form.value.description,
      });
      this.form.reset();
    }
  }
}
