import { Component, OnInit } from '@angular/core';
import { AuthService } from './lib/services/auth.service';
import { Subscription } from 'rxjs';
import { ModalService } from './lib/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoading: boolean = false;
  popupMessage: string = '';
  loaderSubscription: Subscription;
  popupMessageSubscription: Subscription;


  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
    this.popupMessageSubscription.unsubscribe();
  }

  constructor(private authService: AuthService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.loaderSubscription = this.modalService.loaderChange.subscribe(value => this.isLoading = value);
    this.popupMessageSubscription = this.modalService.popupMsg.subscribe(value => this.popupMessage = value);
    this.authService.autoLogin();
  }
}
