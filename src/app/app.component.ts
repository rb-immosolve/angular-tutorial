import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscriptionOptions: string[] = ['Basic', 'Advanced', 'Pro']
  subscription: string = 'Advanced'

  submit(form: NgForm) {
    console.log(form.value)
    form.reset({ subscription: 'Advanced' });
  }
}
