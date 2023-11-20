import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/lib/services/modal.service';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})
export class ModalPopupComponent {
  @Input() message: string;

  constructor(private modalService: ModalService) { }

  closeMessage() {
    this.modalService.showMessage('');
  }
}
