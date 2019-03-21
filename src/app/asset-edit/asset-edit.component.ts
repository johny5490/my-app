import { Component, OnInit } from '@angular/core';
import {AssetVO} from '../vo/AssetVO';
import {AssetTypeVO} from '../vo/AssetTypeVO';
import {Util} from '../util/Util';
import { DataService} from '../dataExchange/data.service';
import { Carrier} from '../dataExchange/Carrier';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {
  ctrlUrl = "/api/AssetCtrl";
  msg:string="歡迎";
  msg_qry:string="歡迎";
  assetVO:AssetVO = {};
  assetTypeVOs:AssetTypeVO[]=[{}];

  assetVO_qry:AssetVO ={};
  assetVOs:AssetVO[];
  

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.queryAssetTypeList();
    
  }

  queryAssetTypeList(){
    this.dataService.postJson("/api/AssetTypeCtrl/queryAssetTypeList.do").
    subscribe((assetTypeVOs:AssetTypeVO[])=>{
          this.assetTypeVOs = assetTypeVOs;
    },error=>console.log(error));
  }

  create(){
    
    if(!Util.showConfirmMsg("新增")){
      return; 
    }

    this.dataService.postJson(this.ctrlUrl+"/createAsset.do",this.assetVO).
                      subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          
                      },error=>console.log( error));
  }

  update(){
    if(!Util.showConfirmMsg("修改")){
      return; 
    }
    this.dataService.postJson(this.ctrlUrl+"/updateAsset.do",this.assetVO).
                    subscribe((carrier:Carrier)=>{
                      this.msg = carrier.attributeMap["msg"];
                      
                    },error=>console.log("error=" + error));
  }

  delete(){
    if(!Util.showConfirmMsg("刪除")){
      return; 
    }
    this.dataService.postJson(this.ctrlUrl+"/deleteAsset.do",this.assetVO).
                    subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          
                    },error=>console.log("error=" + error));
  }


  copyToEdit(assetVO:AssetVO){      
    //clone Object
    this.assetVO = JSON.parse(JSON.stringify(assetVO));;
  }

  fuzzyQry(){
    this.dataService.postJson(this.ctrlUrl+"/fuzzyQry.do",this.assetVO_qry).
                    subscribe((carrier:Carrier)=>{
                      this.msg_qry = carrier.attributeMap["msg"];   
                      this.assetVOs = carrier.attributeMap["assetVOs"] ;       
                    },error=>console.log("error=" + error));
  }

  showA(event){
    //alert(event.index);
    
  }
}
