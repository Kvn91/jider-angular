import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService, UserAuth } from './auth.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { MessageType, ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  form = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });
  private authService = inject(AuthService);
  private router = inject(Router);
  private modalService = inject(ModalService);
  isLoginMode = signal(true);
  isLoading = signal(false);
  error = signal('');
  success = signal('');

  onSwitchMode() {
    this.isLoginMode.set(!this.isLoginMode());
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.isLoginMode()) {
      this.isLoading.set(true);
      this.authService.login(this.form.value as UserAuth).subscribe({
        next: () => {
          this.modalService.showModal(
            'Vous êtes connecté.',
            MessageType.Success,
          );
          this.router.navigate(['/']);
        },
        error: (errorMsg) => {
          this.error.set(errorMsg);
          this.isLoading.set(false);
        },
      });
    } else {
      this.isLoading.set(true);
      this.authService.register(this.form.value as UserAuth).subscribe({
        next: () => {
          this.success.set('Inscription réussie ! Connectez-vous :)');
          this.isLoginMode.set(true);
          this.isLoading.set(false);
        },
        error: (errorMsg) => {
          this.error.set(errorMsg);
          this.isLoading.set(false);
        },
      });
    }

    this.form.reset();
  }
}
