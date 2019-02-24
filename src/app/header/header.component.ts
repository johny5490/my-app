import { Component, OnInit,HostListener } from '@angular/core';
import { DataService} from '../dataExchange/data.service';
import { Router } from '@angular/router';
import {Util} from '../util/Util';
import {LoginUtil} from '../util/LoginUtil';

import { LoginUser } from '../vo/LoginUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  loginUser:LoginUser ;
  
  constructor(private dataService: DataService, private router: Router) {
      
    window.addEventListener(LoginUtil.STORAGE_CHG_EVENT, (e) => {
        this.loginUser = LoginUtil.getLoginUser();
    });
      
  }

  ngOnInit() {
    
    this.loginUser = LoginUtil.getLoginUser();
    if(this.loginUser.userId===""){
      this.router.navigate(["login"]);
    }
    
   
  }

  logout (){
    LoginUtil.removeFromStorage();
    //清空loginUser
    this.loginUser = new LoginUser();
    this.router.navigate(["login"]);
    
  }
  
}
