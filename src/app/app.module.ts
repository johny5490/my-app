import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './header/header.component'; 
import { HeroesComponent } from './heroes/heroes.component';
//import { SampleModule } from './sample/sample.module';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ContactListComponent } from './contact-list/contact-list.component';
import {TableModule} from 'primeng/table';
import {AtrEditComponent } from './atr-edit/atr-edit.component';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {AssetTypeEditComponent } from './asset-type-edit/asset-type-edit.component';
import {LoginComponent } from './login/login.component';
import {AuthGuard} from './AuthGuard';
import {AssetEditComponent } from './asset-edit/asset-edit.component';
import {SharedModule} from './module/shared-module/shared-module.module';
import {TabViewModule} from 'primeng/tabview';
import { AssetAtrValComponent } from './asset-atr-val/asset-atr-val.component';
import {CheckboxModule} from 'primeng/checkbox';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { AssetTypeAtrRelEditComponent } from './asset-type-atr-rel-edit/asset-type-atr-rel-edit.component';
import {PaginatorModule} from 'primeng/paginator';
import {HashLocationStrategy,PathLocationStrategy,LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HeroesComponent,
    HeaderComponent,
    ContactListComponent,
    AtrEditComponent,
    AssetTypeEditComponent,
    AssetEditComponent,
    AssetAtrValComponent,
    ContactEditComponent,
    AssetTypeAtrRelEditComponent,
   
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
    PanelMenuModule,
    TableModule,
    PanelModule,
    InputTextModule,
    TabViewModule,
    CheckboxModule,
    SharedModule,
    PaginatorModule,
    AppRoutingModule,
  ],
  providers:[AuthGuard,
              { provide:LocationStrategy,
                useClass:HashLocationStrategy,
                //useClass:PathLocationStrategy
              }
    ],
  entryComponents:[],
  bootstrap: [AppComponent],
})
export class AppModule { }
