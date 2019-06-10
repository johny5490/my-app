import { Component, OnInit } from '@angular/core';
import {DataService} from '../dataExchange/data.service';
import { VendorVO } from '../vo/VendorVO';
import {Carrier} from '../dataExchange/Carrier';
import {Util} from '../util/Util';
@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  ctrlUrl = "oajcVendorCtrl/";
  vendorVO:VendorVO = new VendorVO();
  msg:string ="歡迎";



  constructor(private dataService:DataService) { }

  ngOnInit() {

  }

  create(){
     this.doPost("新增","create","vendorVO");
  }

  doPost(actionName:string,ctrlMethod:string, respVOkey:string){
    if(!Util.showConfirmMsg(actionName)){
      return; 
    }
    this.dataService.postJsonDefaultParam(this.ctrlUrl + ctrlMethod, this.vendorVO).subscribe((carrier:Carrier)=>{
      this.msg = carrier.attributeMap["msg"];
      if(carrier.attributeMap[respVOkey] != undefined && carrier.attributeMap[respVOkey]!=null){
        this.vendorVO = carrier.attributeMap[respVOkey];
      }
    }, error=>{this.handleError(error)});
  }

  update(){
      this.doPost("修改","update","vendorVO");
  }

  delete(){
      this.doPost("刪除","delete","vendorVO");
  }

  handleError(error){
    this.msg = "系統發生異常";
    console.log( error);
  }
}
