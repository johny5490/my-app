import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { SampleHeaderComponent } from './header/sampleHeader.component';
import { SampleBodyComponent } from '../sample/body/sampleBody.component';
import { ElModule } from 'element-angular';

@NgModule({
  declarations: [SampleHeaderComponent, SampleBodyComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ElModule.forRoot(),
  ],
  exports:[
    SampleHeaderComponent,
    SampleBodyComponent,
  ],

})
export class SampleModule { }
