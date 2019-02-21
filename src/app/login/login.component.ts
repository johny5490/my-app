import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import { Carrier } from '../dataExchange/Carrier';
import { Util } from '../util/Util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  ctrlUrl = "/open/LoginCtrl";
  userId = "";
  passwd = "";

  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  login(){
    var data ={userId:this.userId, passwd:this.passwd};
    this.dataService.postJson(this.ctrlUrl + "/login.do", data).
                    subscribe((carr:Carrier)=>{
                        var msg = carr.attributeMap["msg"];
                        if(msg != ""){
                            alert(msg);
                        }
                        
                        if(carr.attributeMap["userId"] != null){
                          //document.cookie = "sdms_userId=SD0060;path=/";
                          //document.cookie = "sdms_userName="+ encodeURIComponent("陳炯霖") +";path=/";
                          Util.setCookie("sdms_userId", carr.attributeMap["userId"]);
                          Util.setCookie("sdms_userName", carr.attributeMap["userName"]);
                        }
                },error => console.log(error)
    );
  }
}
