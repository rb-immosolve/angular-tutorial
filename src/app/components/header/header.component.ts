import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/lib/services/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  authServiceSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.userSubject.subscribe(user => {
      this.loggedInUser = user;
    });
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }
}
