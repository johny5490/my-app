import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import { Carrier } from '../dataExchange/Carrier';
import { Util } from '../util/Util';
import { Router,ActivatedRoute } from '@angular/router';
import { LoginUtil } from '../util/LoginUtil';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  ctrlUrl = "/open/LoginCtrl";
  userId = "";
  passwd = "";
  //使用者要轉導的網址
  reqUrl = "";
  constructor(private dataService:DataService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((value)=>{
        this.reqUrl = value["reqUrl"];
        
    });
  }

  login(){
    var data ={userId:this.userId, passwd:this.passwd};
    
    this.dataService.postJsonDefaultParam(this.ctrlUrl + "/login.do", data).
                    subscribe((carr:Carrier)=>{
                        var msg = carr.attributeMap["msg"];
                        if(msg != "" && msg!=undefined){
                            alert(msg);
                        }
                        
                        if(carr.attributeMap["LoginUserVO"] != null){                                                   
                          LoginUtil.saveToStorage(carr.attributeMap["LoginUserVO"]);
                          if(this.reqUrl != null && this.reqUrl!=undefined){
                              Util.routerLinkReload(this.router, this.reqUrl);
                          }
                          //else可以轉到首頁，但目前沒有首頁
                        }
                },error => console.log(error)
    );
    
    
  }
}
