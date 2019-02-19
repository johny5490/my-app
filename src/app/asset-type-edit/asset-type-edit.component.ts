import { Component, OnInit } from '@angular/core';
import {AssetTypeVO} from '../vo/AssetTypeVO';
import { AtrVOiface } from '../vo/AtrVOIface';
import { DataService} from '../dataExchange/data.service';
import { Carrier} from '../dataExchange/Carrier';
import {Util} from '../util/Util';


@Component({
  selector: 'app-asset-type-edit',
  templateUrl: './asset-type-edit.component.html',
  styleUrls: ['./asset-type-edit.component.css']
})
export class AssetTypeEditComponent implements OnInit {
  //編輯區塊資料
  assetTypeVO:AssetTypeVO={};
  //屬性下拉選單資料
  atrVOs:AtrVOiface[]=[{}];
  assetTypeVOs:AssetTypeVO[]=[{}];
  msg:string="歡迎";
  ctrlUrl='/api/AssetTypeCtrl';

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.queryAtrList().subscribe((artVOArray:AtrVOiface[])=>{
            this.atrVOs=artVOArray;
        },error => console.log("error=" + error));
    this.queryAssetTypeList();
  }

  queryAssetTypeList(){
    this.dataService.postJson(this.ctrlUrl+"/queryAssetTypeList.do").
    subscribe((assetTypeVOs:AssetTypeVO[])=>{
          this.assetTypeVOs = assetTypeVOs;
    },error=>console.log(error));
  }

  copyToEdit(assetTypeVO:AssetTypeVO){
    //clone Object
    this.assetTypeVO = JSON.parse(JSON.stringify(assetTypeVO));
  }

  create(){
    if(!Util.showConfirmMsg("新增")){
      return; 
    }

    this.dataService.postJson(this.ctrlUrl+"/createAssetType.do",this.assetTypeVO).
                      subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          
                          this.cleanAndQryAtrList();
                      },error=>console.log("error=" + error));
  }

  update(){
    if(!Util.showConfirmMsg("修改")){
      return; 
    }
    this.dataService.postJson(this.ctrlUrl+"/updateAssetType.do",this.assetTypeVO).
                    subscribe((carrier:Carrier)=>{
                      this.msg = carrier.attributeMap["msg"];
                      //修改只重查清單不清空編輯區塊
                      this.queryAssetTypeList();;
                    },error=>console.log("error=" + error));
  }

  delete(){
    if(!Util.showConfirmMsg("刪除")){
      return; 
    }
    this.dataService.postJson(this.ctrlUrl+"/deleteAssetType.do",this.assetTypeVO).
                    subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          this.cleanAndQryAtrList();
                    },error=>console.log("error=" + error));
  }

  private cleanAndQryAtrList(){
    //清空內容
    this.assetTypeVO={};
    //重查清單內容
    this.queryAssetTypeList();
  }
}
