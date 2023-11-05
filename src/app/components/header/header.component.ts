import { Component } from '@angular/core';
import { AuthFirebaseConnector } from 'src/app/lib/services/auth-firebase.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedInUser: User;
  constructor(private authFirebaseConnector: AuthFirebaseConnector) {
    this.authFirebaseConnector.user.subscribe(user => {
      this.loggedInUser = user;
      console.log(this.loggedInUser);
    });
  }
}
