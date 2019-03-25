import { NgModule,APP_INITIALIZER,ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { RouterModule, Routes, ROUTES } from '@angular/router';
 
import { HeroesComponent } from './heroes/heroes.component';
import {EmpListComponent} from './emp-list/emp-list.component';
import {AtrEditComponent} from './atr-edit/atr-edit.component';
import {AssetTypeEditComponent} from './asset-type-edit/asset-type-edit.component';
//import { SampleBodyComponent } from './sample/body/sampleBody.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './AuthGuard';
import {AssetEditComponent} from './asset-edit/asset-edit.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  //{ path: '', component: HeroesComponent, canActivate: [AuthGuard]},
  { path: 'heroes',component: HeroesComponent, canActivate: [AuthGuard]  },
  { path: 'emp-list', component: EmpListComponent, canActivate: [AuthGuard] },
  { path: 'atr-edit',  component: AtrEditComponent, canActivate: [AuthGuard]},
  { path: 'asset-type-edit', component: AssetTypeEditComponent, canActivate: [AuthGuard]},
  { path: 'asset-edit', component: AssetEditComponent, canActivate: [AuthGuard]},
  { path: 'contact-edit', component:ContactEditComponent, canActivate: [AuthGuard]},
  { path: 'picker', loadChildren:'./module/shared-module/shared-module.module#SharedModule' },
  //{ path: 'sample/body', component: SampleBodyComponent },
  //{ path: '**', redirectTo: '404'},
];

//var routes: Routes=[];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
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