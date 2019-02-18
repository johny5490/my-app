import { Component, OnInit } from '@angular/core';
import {AssetTypeVOiface} from '../vo/AssetTypeVOiface';
import { AtrVOiface } from '../vo/AtrVOIface';
import { DataService } from '../dataExchange/data.service';
import {Util} from '../util/Util';

@Component({
  selector: 'app-asset-type-edit',
  templateUrl: './asset-type-edit.component.html',
  styleUrls: ['./asset-type-edit.component.css']
})
export class AssetTypeEditComponent implements OnInit {
  assetTypeVO:AssetTypeVOiface={};
  atrVOs:AtrVOiface[]=[{}];
  msg:string="歡迎";
  ctrlUrl='/';

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.queryAtrList().subscribe((artVOArray:AtrVOiface[])=>{
            this.atrVOs=artVOArray;
        },error => console.log("error=" + error));;
  }

  create(){
    if(!Util.showConfirmMsg("新增")){
      return; 
    }

    //this.dataService.postJson('');
  }

  update(){
    if(!Util.showConfirmMsg("修改")){
      return; 
    }
  }

  delete(){
    if(!Util.showConfirmMsg("刪除")){
      return; 
    }
  }
}
