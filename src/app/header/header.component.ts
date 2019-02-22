import { Component, OnInit } from '@angular/core';
import { DataService} from '../dataExchange/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Util} from '../util/Util';
import { LoginUser } from '../vo/LoginUser';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  static LOGIN_USER = "loginUser";
  loginUser:LoginUser = new LoginUser();

  constructor(private dataService: DataService, private router: Router) {
      
     
      var loinUser:LoginUser = JSON.parse(localStorage.getItem((HeaderComponent.LOGIN_USER)));
      if(loinUser == null){
          this.router.navigate(["login"]);
      }else{
        this.loginUser = loinUser;
        
      }
    
  }
  ngOnInit() {
    
  }

  getCookieUserId(){
    return Util.getCookieValue("sdms_userId");
  }

  getCookieUserName(){
    return Util.getCookieValue("sdms_userName");
  }

  logout(){
    this.loginUser = new LoginUser();
    localStorage.removeItem(HeaderComponent.LOGIN_USER);
  }

}
