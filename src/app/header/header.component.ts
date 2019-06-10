import { Component, OnInit,HostListener } from '@angular/core';
import { DataService} from '../dataExchange/data.service';
import { Router } from '@angular/router';
import {Util} from '../util/Util';
import {LoginUtil} from '../util/LoginUtil';
import { LoginUserVO } from '../vo/LoginUserVO';
import {Carrier} from '../dataExchange/Carrier';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  loginUserVO:LoginUserVO = new LoginUserVO() ;
  //sysTime:Date;

  //server系統時間
  systime:string;

  //timeInterval;
  //每隔1分鐘更新系統時間
  //refreshTime=60000;

  ctrlUrl = "osjcLoginCtrl/";

  constructor(private dataService: DataService, private router: Router) {
    
    window.addEventListener(LoginUtil.STORAGE_CHG_EVENT, (e) => {
        this.loginUserVO = LoginUtil.getLoginUser();
        //this.refreshSysTime();
    });
    
    dataService.eventBus.subscribe(event=>{
        if(event.name="systime"){
           this.systime = event.value.substring(0,4) + "/" +  
           event.value.substring(4,6) + "/" +
           event.value.substring(6,8) + " " + 
           event.value.substring(9 , 11) + ":" + 
           event.value.substring(11 , 13) + ":" + 
           event.value.substring(13);
        }
    });
    //this.refreshSysTime();
    
  }
  /*定時更新系統時間
  refreshSysTime(){
    if(LoginUtil.isLogin()){
      this.keepGetSysTime();
    }else{
      this.sysTime=null;
      clearInterval(this.timeInterval);
    }  
  }
  

  getSysTime(){
    this.dataService.postJsonDefaultParam("/open/LoginCtrl/getSysTime.do").subscribe((carr:Carrier)=>{
          this.sysTime = carr.attributeMap["sysTime"];
    },error => console.log(error));
  }

  keepGetSysTime(){
    this.getSysTime();
    clearInterval(this.timeInterval);
    this.timeInterval = setInterval(()=>{
        this.getSysTime();
    },this.refreshTime);  
  }
  */
  ngOnInit() {
    /*
    this.loginUserVO = LoginUtil.getLoginUser();
    
    if(this.loginUserVO.userId===""){
      //this.router.navigate(["login"]);
      LoginUtil.relogin(this.dataService);
    }
    */
    //this.dataService.postJsonDefaultParam(this.ctrlUrl+"doNothing").subscribe(()=>{},error=>{console.log(error)});
  }

  logout (){
    LoginUtil.removeFromStorage();
    //清空loginUser
    //this.loginUserVO = new LoginUserVO();
    //this.router.navigate(["login"]);
    this.dataService.postJsonDefaultParam(this.ctrlUrl+"logOut").subscribe(()=>{},error=>{console.log(error)});
  }
  
}
