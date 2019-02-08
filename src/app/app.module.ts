import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './header/header.component'; 
import { BodyComponent } from './body/body.component';
import { HeroesComponent } from './heroes/heroes.component';
//import { SampleModule } from './sample/sample.module';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeaderComponent,
    BodyComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //SampleModule,
    AccordionModule,
    ButtonModule,
    MenubarModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
