import { Component, OnInit,ComponentFactoryResolver,ViewContainerRef,Compiler,NgModule,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit{
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  title = '您好';
  menuItems: MenuItem[];

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
    //routes.push({path:'heroes', component:this.genComponent('HeroesComponent')});
    
    //var heroCom = Object.create(window["HeroesComponent"].prototype);
    
    //var heroCom = Object.create(HeroesComponent.prototype);
    
    //routes.push({path:'heroes', component:heroCom});
  
    //this.router.resetConfig(routes);
    this.menuItems = [
      {
        label: '作業總覽',
        icon: 'pi pi-pi pi-bars',
        expanded: true,
        items: [
            {label: '通訊錄', icon: 'pi pi-pi pi-search', routerLink: ['/emp-list'] },
            {
              label: '資產管理',
              expanded: true, 
              //icon: 'pi pi-fw pi-plus',
              items: [
                  //{label: '屬性設定', icon: 'pi pi-fw pi-pencil', routerLink:['/atr-edit']},
                  {label: '屬性設定', icon: 'pi pi-fw pi-pencil', command:(event) => {
                              //event.originalEvent: Browser event
                              //event.item: menuitem metadata
                              this.routerLinkReload('/atr-edit');
                          }},
                  {label: '資產種類設定', icon: 'pi pi-fw pi-pencil', command:(event) => {
                              this.routerLinkReload('/asset-type-edit');
                        }},
                  {label: '資產設定', icon: 'pi pi-fw pi-pencil'},
                  
              ]
          },
        ]
    },
    
   ];
  }

  //routerLink在重複點擊時不會刷新畫面，故先連結一個不存在頁面再轉來達到刷新效果，
  //比使用onSameUrlNavigation要簡單的多
  routerLinkReload(url:string){
    this.router.navigateByUrl('', {skipLocationChange: true}).
                then(()=>
                     this.router.navigate([url]));
  }
}
