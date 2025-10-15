import { Injectable, signal } from '@angular/core';

export enum MessageType {
  Error = 'error',
  Confirmation = 'confirmation',
  Success = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _message = signal('');
  message = this._message.asReadonly();
  private _messageType = signal<MessageType | ''>('');
  messageType = this._messageType.asReadonly();

  showModal(msg: string, msgType: MessageType) {
    this._message.set(msg);
    this._messageType.set(msgType);
  }

  clearModal() {
    this._message.set('');
    this._messageType.set('');
  }
}
