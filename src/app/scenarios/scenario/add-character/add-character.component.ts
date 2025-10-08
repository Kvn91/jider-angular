import { Component, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-character',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-character.component.html',
})
export class AddCharacterComponent {
  scenarioId = input<string>();
  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: new FormControl('', { validators: [Validators.required] }),
  });

  onSubmit() {}
}
