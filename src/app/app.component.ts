import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ErrorModalComponent } from './shared/modal/error-modal/error-modal.component';
import { ModalService } from './shared/modal.service';
import { SuccessModalComponent } from './shared/modal/success-modal/success-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private modalService = inject(ModalService);
  message = this.modalService.message;
  messageType = this.modalService.messageType;
}
