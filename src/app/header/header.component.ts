import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { UserToken } from '../userToken';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(private dataService: DataService, private router: Router) { }

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

  iconClick(){
    alert("123");
  }

  menuClick(index: string){
    console.log(index);
    if(index == "1"){
        //回首頁
        window.location.href="/";
    }else if(index == "2-1"){
         this.router.navigate(['/heroes']);
    }else if(index == "2-2"){
          
    } 
    
  }
}
