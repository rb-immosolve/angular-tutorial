import { Component } from '@angular/core';

@Component({
  selector: 'app-list-sorter',
  templateUrl: './list-sorter.component.html',
  styleUrls: ['./list-sorter.component.scss']
})
export class ListSorterComponent {

  wordList: string[] = ['giraffe', 'hello', 'pineapple', 'cat', 'door', 'jacket']

}
