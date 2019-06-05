import { Component, OnInit } from '@angular/core';
import {DataService} from '../dataExchange/data.service';
import { VendorVO } from '../vo/VendorVO';
import {Carrier} from '../dataExchange/Carrier';

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
    this.dataService.postJsonDefaultParam(this.ctrlUrl + "create", this.vendorVO).subscribe((carrier:Carrier)=>{
          
    }, error=>{this.handleError(error)});
  }

  update(){

  }

  delete(){

  }

  handleError(error){
    this.msg = "系統發生異常";
    console.log( error);
  }
}
