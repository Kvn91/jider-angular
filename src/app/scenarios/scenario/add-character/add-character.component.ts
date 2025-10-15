import { Component, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';
import { ScenarioService } from '../../scenario.service';
import { MessageType, ModalService } from '../../../shared/modal.service';

interface AddCharacterForm {
  name: string;
  description: string;
}
@Component({
  selector: 'app-add-character',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-character.component.html',
})
export class AddCharacterComponent {
  scenarioId = input<string>('');
  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  private scenariosService = inject(ScenarioService);
  private modalService = inject(ModalService);
  private router = inject(Router);

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.scenariosService
      .addCharacter({
        scenarioId: this.scenarioId(),
        ...(this.form.value as AddCharacterForm),
      })
      .subscribe({
        next: () => {
          this.form.reset();
          this.router.navigate(['/scenarios', this.scenarioId()], {
            replaceUrl: true,
          });
          this.modalService.showModal(
            'Le personnage a été ajouté avec succès !',
            MessageType.Success,
          );
        },
      });
  }
}

export const canLeaveNewCharacterPage: CanDeactivateFn<
  AddCharacterComponent
> = (component) => {
  if (component.form.dirty) {
    return window.confirm(
      'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter la page ?',
    );
  }
  return true;
};
