import { Component, OnInit } from '@angular/core';
import { DataService} from '../dataExchange/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private dataService: DataService, private router: Router) {
      
      //document.cookie = "sdms_userId=SD0060;path=/";
      //document.cookie = "sdms_userName="+ encodeURIComponent("陳炯霖") +";path=/";
      if( this.getCookieUserId() ==""){
          this.router.navigate(["login"]);
      }      
  }

  getCookieUserId(){
    return this.getCookieValue("sdms_userId");
  }

  getCookieUserName(){
    return this.getCookieValue("sdms_userName");
  }

  getCookieValue(cookieName:string){
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      //去掉前空格
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  ngOnInit() {
    
  }


}
