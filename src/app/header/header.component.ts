import { Component, OnInit } from '@angular/core';
import { DataService} from '../dataExchange/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Util} from '../util/Util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) {
      
    /*
      if( this.getCookieUserId() ==""){
          this.router.navigate(["login"]);
      }      
    */
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
    
  }

}
