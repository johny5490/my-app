import { Component, OnInit,ComponentFactoryResolver,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = '您好';

  constructor(private router: Router, 
              private resolver: ComponentFactoryResolver,
              private vr:ViewContainerRef){

  }

  ngOnInit(){
    /*
    let routes = [
      { path: 'heroes', component: HeroesComponent },
    ]; 
    */
   
    let routes=[];
    /*
    let factories = Array.from(this.resolver['_factories'].values());
    for(var i =0 ; i < factories.length ;i++){
      let x:any=factories[i];
      console.log("componentType.name=" + x.componentType.name);
      if(x.componentType.name === 'HeroesComponent'){
        routes.push({path:'heroes', component:x.componentType});
      }
      
    }
    */
    //this.vr.clear();
    //this.vr.createComponent(this.resolver.resolveComponentFactory(HeroesComponent));
    //routes.push({path:'heroes', component:HeroesComponent});
    //var heroCom = Object.create(window["HeroesComponent"].prototype);
    var heroCom = Object.create(HeroesComponent.prototype);
    
    routes.push({path:'heroes', component:HeroesComponent});
    
    console.log("routes.len=" + routes.length);
    this.router.resetConfig(routes);
    
  }
}
