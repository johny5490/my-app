import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'body', component: BodyComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports:[RouterModule]
})

export class AppRoutingModule { }