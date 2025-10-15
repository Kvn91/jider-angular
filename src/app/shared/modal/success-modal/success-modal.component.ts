import { Component, inject, input } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-success-modal',
  imports: [ModalComponent],
  templateUrl: './success-modal.component.html',
})
export class SuccessModalComponent {
  title = input<string>();
  message = input<string>();
  private modalService = inject(ModalService);

  onClearModal() {
    this.modalService.clearModal();
  }
}
