import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPickerComponent } from './cpt/user-picker/user-picker.component';
import {SharedModuleRouting} from './shared-module-routing.module';
import { PickerComponent } from './cpt/picker/picker.component';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    PickerComponent,
    UserPickerComponent],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SharedModuleRouting
  ],
  exports:[UserPickerComponent]
})
export class SharedModule { }
