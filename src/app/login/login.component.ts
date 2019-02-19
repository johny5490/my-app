import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import { Carrier } from '../dataExchange/Carrier';

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
                        }else{

                        }
                },error => console.log(error)
    );
  }
}
