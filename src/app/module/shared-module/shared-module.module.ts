import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPickerComponent } from './cpt/user-picker/user-picker.component';
import {SharedModuleRouting} from './shared-module-routing.module';
import { PickerComponent } from './cpt/picker/picker.component';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PickerComponent,
    UserPickerComponent],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    SharedModuleRouting
  ],
  exports:[UserPickerComponent]
})
export class SharedModule { }
