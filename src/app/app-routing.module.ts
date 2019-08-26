import { NgModule,APP_INITIALIZER,ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { RouterModule, Routes, ROUTES } from '@angular/router';
 
import { HeroesComponent } from './heroes/heroes.component';
import {ContactListComponent} from './contact-list/contact-list.component';
import {AtrEditComponent} from './atr-edit/atr-edit.component';
import {AssetTypeEditComponent} from './asset-type-edit/asset-type-edit.component';
//import { SampleBodyComponent } from './sample/body/sampleBody.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './AuthGuard';
import {AssetEditComponent} from './asset-edit/asset-edit.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';
import {VendorMealEditComponent} from './vendor-meal-edit/vendor-meal-edit.component';
import {VendorScheduleComponent} from './vendor-schedule/vendor-schedule.component';
import {MealOrderComponent} from './meal-order/meal-order.component';
import { MealOrderReportComponent } from './meal-order-report/meal-order-report.component';
import { MealDishEditComponent } from './meal-dish-edit/meal-dish-edit.component';

const routes: Routes = [
  //{ path: 'login', component:LoginComponent },
  //{ path: '', component: HeroesComponent, canActivate: [AuthGuard]},
  { path: 'heroes',component: HeroesComponent },
  { path: 'contact-list', component: ContactListComponent, canActivate: [AuthGuard] },
  { path: 'atr-edit',  component: AtrEditComponent, canActivate: [AuthGuard]},
  { path: 'asset-type-edit', component: AssetTypeEditComponent, canActivate: [AuthGuard]},
  { path: 'asset-edit', component: AssetEditComponent, canActivate: [AuthGuard]},
  { path: 'contact-edit', component:ContactEditComponent, canActivate: [AuthGuard]},
  { path: 'picker', loadChildren:'./module/shared-module/shared-module.module#SharedModule' },
  { path: 'vendor-meal-edit', component:VendorMealEditComponent, canActivate: [AuthGuard]},
  { path: 'vendor-schedule', component:VendorScheduleComponent, canActivate: [AuthGuard]},
  { path: 'meal-dish-edit',component:MealDishEditComponent, canActivate: [AuthGuard]},
  { path: 'meal-order', component:MealOrderComponent, canActivate: [AuthGuard]},
  { path: 'meal-order-report',component:MealOrderReportComponent, canActivate: [AuthGuard]},
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