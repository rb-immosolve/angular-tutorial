import { Component } from '@angular/core';

@Component({
  selector: 'app-databinding',
  templateUrl: './databinding.component.html',
  styleUrls: ['./databinding.component.css']
})
export class DatabindingComponent {
  addNewRowButtonDisabled:boolean = true;
  allowButtonText:string = "Add Row";
  defaultRowNameText:string = "Enter row name"
  currentRowName:string = ""
  rowCounter:number = 0;
  rows:string[] = []

  constructor(){  }

  addNewRow():void {
    this.rows.push(this.currentRowName)
    this.rowCounter++
    this.currentRowName = ""
    this.addNewRowButtonDisabled = true
  }

  calculateButtonDisable():void {
    if(this.currentRowName.length != 0){
      this.addNewRowButtonDisabled = false
    }else{
      this.addNewRowButtonDisabled = true
    }
  }
}
