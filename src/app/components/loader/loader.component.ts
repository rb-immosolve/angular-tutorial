import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/lib/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  loaderServiceSubscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderServiceSubscription = this.loaderService.loaderChange.subscribe(value => this.isLoading = value);
  }

  ngOnDestroy(): void {
    this.loaderServiceSubscription.unsubscribe();
  }

}
