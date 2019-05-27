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
  
  loginUserVO:LoginUserVO ;
  sysTime:Date;
  
  timeInterval;
  //每隔1分鐘更新系統時間
  refreshTime=60000;

  ctrlUrl = "osjcLoginCtrl/";

  constructor(private dataService: DataService, private router: Router) {
    
    window.addEventListener(LoginUtil.STORAGE_CHG_EVENT, (e) => {
        this.loginUserVO = LoginUtil.getLoginUser();
        //this.refreshSysTime();
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
  */

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

  ngOnInit() {
    
    this.loginUserVO = LoginUtil.getLoginUser();
    if(this.loginUserVO.userId===""){
      //this.router.navigate(["login"]);
      LoginUtil.relogin(this.dataService);
    }
    
   
  }

  logout (){
    LoginUtil.removeFromStorage();
    //清空loginUser
    //this.loginUserVO = new LoginUserVO();
    //this.router.navigate(["login"]);
    this.dataService.postJsonDefaultParam(this.ctrlUrl+"logOut").subscribe(()=>{},error=>{console.log(error)});
  }
  
}
