import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import {UserToken} from '../userToken';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = "安琪拉";
  deptName = "財會";
  txtVal = "123";
  towWayBingTxt = "666";
  userToken: UserToken;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.userToken = this.dataService.getUserToken();
  }

  showValue(){
    alert("txtVal=" + this.txtVal);
  }

  updateHero(){
    this.dataService.updateHero();
    alert("ok");
  }
}
