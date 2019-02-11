import { Component, OnInit,ComponentFactoryResolver,ViewContainerRef,Compiler,NgModule,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit{
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  title = '您好';

  constructor(private router: Router, 
              private resolver: ComponentFactoryResolver,
              private vr:ViewContainerRef,
              private compiler: Compiler){

  }
  
  private genComponent(template: string, properties: any = {}) {
    @Component({ template })
    class TemplateComponent { }

    @NgModule({ declarations: [TemplateComponent] })
    class TemplateModule { }
    
    const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = mod.componentFactories.find((comp) =>
      comp.componentType === TemplateComponent
    );
    
    const component = this.container.createComponent(factory);
    //return component;
    return Object.assign(component.instance, properties);
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
    /*
    this.vr.clear();
    var heroCom=this.vr.createComponent(this.resolver.resolveComponentFactory(HeroesComponent));
    routes.push({path:'heroes', component:heroCom});
    */
   routes.push({path:'heroes', component:this.genComponent('HeroesComponent')});

    //var heroCom = Object.create(window["HeroesComponent"].prototype);
    
    //var heroCom = Object.create(HeroesComponent.prototype);
    
    //routes.push({path:'heroes', component:heroCom});
    
    console.log("routes.len=" + routes.length);
    this.router.resetConfig(routes);
    
  }
}
