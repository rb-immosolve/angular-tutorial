import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ModalPopupComponent } from "src/app/components/modal-popup/modal-popup.component";
import { DropdownDirective } from "../directives/dropdown-directive";

@NgModule({
  declarations: [
    LoaderComponent,
    ModalPopupComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoaderComponent,
    ModalPopupComponent,
    ReactiveFormsModule,
    CommonModule,
    DropdownDirective
  ]
})
export class SharedModule {}