import { NgModule,APP_INITIALIZER,ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { RouterModule, Routes, ROUTES } from '@angular/router';
 

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeroesComponent } from './heroes/heroes.component';
import {EmpListComponent} from './emp-list/emp-list.component';
import {BodyComponent} from './body/body.component';
import {DataService} from './data.service';


//import { SampleBodyComponent } from './sample/body/sampleBody.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'emp-list', component: EmpListComponent },
  //{ path: 'sample/body', component: SampleBodyComponent },
];

//var routes: Routes=[];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  //imports: [RouterModule.forChild([])],
  exports:[RouterModule],
  /*
  providers: [ 
    { 
     provide: ROUTES, 
     useFactory:  (dataService: DataService) => () => dataService.getInitRouts(), 
     deps: [DataService],
     multi: true 
    } ,
    
  ]
  */
})

export class AppRoutingModule {

}