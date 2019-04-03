import { Component, OnInit, Input } from '@angular/core';
import {Util} from '../util/Util';
import { DataService} from '../dataExchange/data.service';
import { Carrier} from '../dataExchange/Carrier';
import {AssetAtrValVO} from '../vo/AssetAtrValVO';
import {AtrVOiface} from '../vo/AtrVOiface';
import { AlertPromise } from 'selenium-webdriver';

@Component({
  selector: 'app-asset-atr-val',
  templateUrl: './asset-atr-val.component.html',
  styleUrls: ['./asset-atr-val.component.css']
})
export class AssetAtrValComponent implements OnInit {
  ctrlUrl = "/api/AssetAtrValCtrl";
  assetAtrValVOs:Array<AssetAtrValVO>=[];
  msg:string="歡迎";
  
  _assetId:string;

  btnDisable:boolean=true;
  //屬性代碼選單
  atrVOs:Array<AtrVOiface>=[];

  @Input()
  set assetId(assetId){
    if(Util.hasValue(assetId)){
        this.msg="歡迎";
        this._assetId=assetId;
        this.btnDisable=false;
        this.qryAtrVOsAndAssetAtrValVOs();
        
    }
    
  }

  qryAssetAtrValVOs(){
      this.dataService.postString(this.ctrlUrl+"/queryAssetAtrVOList.do", this._assetId).subscribe((carrier:Carrier)=>{
            var assetAtrValVOList = carrier.attributeMap["assetAtrValVOList"];
            this.assetAtrValVOs = assetAtrValVOList==null || assetAtrValVOList==undefined ? new Array():assetAtrValVOList;
            if(this.assetAtrValVOs.length==0){
                var vo = new AssetAtrValVO();
                this.assetAtrValVOs.push(vo);
            }
        },error=>console.log( error));

  }

  constructor(private dataService:DataService) { }

  ngOnInit() {
    
    
  }

  qryAtrVOsAndAssetAtrValVOs(){
    //查詢屬性代碼清單
    this.dataService.postString("/api/AtrCtrl/queryAtrList.do", this._assetId).
    subscribe((carrier:Carrier)=>{
        
        if(Util.hasValue(carrier.attributeMap["msg"])){
            this.msg = carrier.attributeMap["msg"];
        }
        this.atrVOs = carrier.attributeMap["atrList"];
        //查詢資產屬性關係內容
        this.qryAssetAtrValVOs();
    },error=>console.log( error));
  }

  create(){
    
    if(!Util.showConfirmMsg("新增")){
      return; 
    }
    if(!this.hasChecked()){
        return;
    }
    
    this.dataService.postJson(this.ctrlUrl+"/createAssetAtrValList.do",this.getCheckedVOList()).
                      subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          this.assetAtrValVOs = carrier.attributeMap["assetAtrValVOList"];
                      },error=>console.log( error));
    
  }

  
  hasChecked(){
    var checked=false;
    for(var i=0;i<this.assetAtrValVOs.length;i++){
      var assetAtrVO = this.assetAtrValVOs[i];
      if(assetAtrVO.checked){
        checked=true;
      }
    }
    
    if(!checked){
        alert("請至少勾選一筆");
    }
    return checked;
  }

  getCheckedVOList(){
    var checkedVOList:Array<AssetAtrValVO>=[];
    for(var i=0;i<this.assetAtrValVOs.length;i++){
        var assetAtrVO = this.assetAtrValVOs[i];
        if(assetAtrVO.checked){
          assetAtrVO.assetId=this._assetId;
          checkedVOList.push(assetAtrVO);
        }
    }
    return checkedVOList;
  }

  update(){
   
    if(!Util.showConfirmMsg("修改")){
      return; 
    }
    if(!this.hasChecked()){
      return;
    }
    this.dataService.postJson(this.ctrlUrl+"/updateAssetAtrValList.do",this.getCheckedVOList()).
                      subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          this.assetAtrValVOs = carrier.attributeMap["assetAtrValVOList"];
                      },error=>console.log( error));
  }

  delete(){
    if(!Util.showConfirmMsg("刪除")){
      return; 
    }
    if(!this.hasChecked()){
      return;
    }
    this.dataService.postJson(this.ctrlUrl+"/deleteAssetAtrValList.do",this.getCheckedVOList()).
                      subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          this.assetAtrValVOs = carrier.attributeMap["assetAtrValVOList"];
                      },error=>console.log( error));
  }

  //最後一筆自動增列
  genEmptyRow(rowIndex){
    if(rowIndex==this.assetAtrValVOs.length-1){
      this.assetAtrValVOs.push(new AssetAtrValVO());
    }
    
  }
}
