import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/lib/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.authService.userSubject.subscribe(user => {
      if (user) {
        this.router.navigate(['/recipe']);
      } else {
        this.router.navigate(['/auth']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
