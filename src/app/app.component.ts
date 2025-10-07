import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ErrorService } from './shared/error.service';
import { ErrorModalComponent } from './shared/modal/error-modal/error-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ErrorModalComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private errorService = inject(ErrorService);
  error = this.errorService.error;
}
