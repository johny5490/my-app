import { Component, OnInit,ComponentFactoryResolver,ViewContainerRef,Compiler,NgModule,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Util} from './util/Util';
import {LoginUtil} from './util/LoginUtil';
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
    var properyManage = {
      label: '資產管理',
      expanded: true,
      //icon: 'pi pi-fw pi-plus',
      items: [
        //{label: '屬性設定', icon: 'pi pi-fw pi-pencil', routerLink:['/atr-edit']},
        {
          label: '屬性設定', icon: 'pi pi-fw pi-pencil', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            Util.routerLinkReload(this.router, '/atr-edit');
          }
        },
        {
          label: '資產種類設定', icon: 'pi pi-fw pi-pencil', command: (event) => {
            Util.routerLinkReload(this.router, '/asset-type-edit');
          }
        },
        {
          label: '資產設定', icon: 'pi pi-fw pi-pencil', command: (event) => {
            Util.routerLinkReload(this.router, '/asset-edit');
          }
        },

      ]
    };

    this.menuItems = [
      {
        label: '作業總覽',
        icon: 'pi pi-pi pi-bars',
        expanded: true,
        items: [
            {label: '首頁', icon: 'pi pi-fw  pi-home', command:(event) =>{
                window.location.href = Util.getUrlNoPort() + "/erp/ds/dsjsp00";
            } },
            {label: '通訊錄管理',expanded: true,  
             items: [
                  {label: '通訊錄維護', icon: 'pi pi-fw pi-pencil', command:(event) => {    
                      Util.routerLinkReload(this.router, '/contact-edit');
                     } }, 
                  {label: '通訊錄清單', icon: 'pi pi-fw pi-users', routerLink: ['/contact-list'] }, 
             ]},
            
            //{label: '功能建置中', icon: 'pi pi-fw pi-spin pi-star-o',items:[properyManage]},
        ]
    },
   ];
  }

 
}
