import { Component, OnInit } from '@angular/core';
import {Util} from '../util/Util';
import { DataService} from '../dataExchange/data.service';
import { Carrier} from '../dataExchange/Carrier';


@Component({
  selector: 'app-asset-atr-rel',
  templateUrl: './asset-atr-rel.component.html',
  styleUrls: ['./asset-atr-rel.component.css']
})
export class AssetAtrRelComponent implements OnInit {
  ctrlUrl = "/api/AssetAtrRelCtrl";
  assetAtrRelVO;
  msg:string="歡迎";
  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  create(){
    
    if(!Util.showConfirmMsg("新增")){
      return; 
    }

    this.dataService.postJson(this.ctrlUrl+"/create.do",this.assetAtrRelVO).
                      subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          
                      },error=>console.log( error));
  }

  update(){
    if(!Util.showConfirmMsg("修改")){
      return; 
    }
    this.dataService.postJson(this.ctrlUrl+"/update.do",this.assetAtrRelVO).
                    subscribe((carrier:Carrier)=>{
                      this.msg = carrier.attributeMap["msg"];
                      
                    },error=>console.log("error=" + error));
  }

  delete(){
    if(!Util.showConfirmMsg("刪除")){
      return; 
    }
    this.dataService.postJson(this.ctrlUrl+"/delete.do",this.assetAtrRelVO).
                    subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          
                    },error=>console.log("error=" + error));
  }
}
