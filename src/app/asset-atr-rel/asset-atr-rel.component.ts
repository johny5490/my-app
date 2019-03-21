import { Component, OnInit, Input } from '@angular/core';
import {Util} from '../util/Util';
import { DataService} from '../dataExchange/data.service';
import { Carrier} from '../dataExchange/Carrier';
import {AssetAtrRelVO} from '../vo/AssetAtrRelVO';
import {AtrVOiface} from '../vo/AtrVOiface';
import { AlertPromise } from 'selenium-webdriver';

@Component({
  selector: 'app-asset-atr-rel',
  templateUrl: './asset-atr-rel.component.html',
  styleUrls: ['./asset-atr-rel.component.css']
})
export class AssetAtrRelComponent implements OnInit {
  ctrlUrl = "/api/AssetAtrRelCtrl";
  assetAtrRelVOs:Array<AssetAtrRelVO>=[];
  msg:string="歡迎";
  
  _assetId:string;

  @Input()
  set assetId(assetId){
    this._assetId=assetId;
    //尚未完成，需要查詢資產編號設定了那些屬性值，來update assetAtrRelVOs

  }

  //屬性代碼選單
  atrVOs:Array<AtrVOiface>=[];

  constructor(private dataService:DataService) { }

  ngOnInit() {
    
    var vo = new AssetAtrRelVO();
    vo.atrId="123";
    //this.assetAtrRelVOs=[vo];
    this.assetAtrRelVOs.push(vo);
    this.dataService.postJson("/api/AtrCtrl/queryAtrList.do").
    subscribe((carrier:Carrier)=>{
        
        if(Util.hasValue(carrier.attributeMap["msg"])){
            this.msg = carrier.attributeMap["msg"];
        }
        this.atrVOs = carrier.attributeMap["atrList"];
    },error=>console.log( error));


  }

  create(){
    
    if(!Util.showConfirmMsg("新增")){
      
      return; 
    }
    if( !Util.hasValue(this._assetId)){
        alert("請先查詢，並點選一筆資產");
        return ;
    }

    //尚未完成，只送有勾選的資料，server完成要重查結果，更新assetAtrRelVOs
    
    /*
    this.dataService.postJson(this.ctrlUrl+"/create.do",this.assetAtrRelVO).
                      subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          
                      },error=>console.log( error));
    */
  }

  update(){
   
    if(!Util.showConfirmMsg("修改")){
      return; 
    }
    /*
    this.dataService.postJson(this.ctrlUrl+"/update.do",this.assetAtrRelVO).
                    subscribe((carrier:Carrier)=>{
                      this.msg = carrier.attributeMap["msg"];
                      
                    },error=>console.log("error=" + error));
                    */
  }

  delete(){
    if(!Util.showConfirmMsg("刪除")){
      return; 
    }
    /*
    this.dataService.postJson(this.ctrlUrl+"/delete.do",this.assetAtrRelVO).
                    subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          
                    },error=>console.log("error=" + error));
                    */
  }

  //最後一筆自動增列
  genEmptyRow(rowIndex){
    if(rowIndex==this.assetAtrRelVOs.length-1){
      this.assetAtrRelVOs.push(new AssetAtrRelVO());
    }
    
  }
}
