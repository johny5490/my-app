import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {PickerComponent} from './cpt/picker/picker.component';
import {UserPickerComponent} from './cpt/user-picker/user-picker.component';

const routes: Routes= [
    
    {path: 'user-picker', component:UserPickerComponent,outlet:'popup' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
})
export class SharedModuleRouting { }
