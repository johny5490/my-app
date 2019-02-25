import { Component, OnInit,HostListener } from '@angular/core';
import { DataService} from '../dataExchange/data.service';
import { Router } from '@angular/router';
import {Util} from '../util/Util';
import {LoginUtil} from '../util/LoginUtil';

import { LoginUserVO } from '../vo/LoginUserVO';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  loginUserVO:LoginUserVO ;
  
  constructor(private dataService: DataService, private router: Router) {
      
    window.addEventListener(LoginUtil.STORAGE_CHG_EVENT, (e) => {
        this.loginUserVO = LoginUtil.getLoginUser();
    });
      
  }

  ngOnInit() {
    
    this.loginUserVO = LoginUtil.getLoginUser();
    if(this.loginUserVO.userId===""){
      this.router.navigate(["login"]);
    }
    
   
  }

  logout (){
    LoginUtil.removeFromStorage();
    //清空loginUser
    this.loginUserVO = new LoginUserVO();
    this.router.navigate(["login"]);
    
  }
  
}
