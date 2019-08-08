import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPickerComponent } from './cpt/user-picker/user-picker.component';
import {SharedModuleRouting} from './shared-module-routing.module';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { PaginatorComponent } from './cpt/paginator/paginator.component';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    UserPickerComponent,
    PaginatorComponent],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    SharedModuleRouting
  ],
  exports:[UserPickerComponent,PaginatorComponent]
})
export class SharedModule { }
