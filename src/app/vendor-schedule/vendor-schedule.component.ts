import { Component, OnInit } from '@angular/core';
import { Util } from '../util/Util';
import { VendorScheduleVO } from '../vo/vendorScheduleVO';
import {SelectItem} from 'primeng/api';
import { DataService } from '../dataExchange/data.service';
import { Carrier} from '../dataExchange/Carrier';
import {DatePipe} from "@angular/common";
import { VendorVO } from '../vo/VendorVO';

@Component({
  selector: 'app-vendor-schedule',
  templateUrl: './vendor-schedule.component.html',
  styleUrls: ['./vendor-schedule.component.css']
})
export class VendorScheduleComponent implements OnInit {

  twLocale = Util.getCalendarLocale();
 
  orderDateS_qry:string=this.datePipe.transform(new Date(), 'yyyy/MM/dd');
  orderDateE_qry:string="";

  VendorScheduleVOs:Array<VendorScheduleVO>=new Array();

  //orderIntervalOptions:SelectItem[];
  orderIntervalOptions:OrderInterval[];
  
  vendorVOs={};

  checkAllValue:string="";

  ctrlUrl = "oajcVendorScheduleCtrl/";
  
  msg="歡迎";
  
  constructor(private dataService:DataService, private datePipe:DatePipe) {
    /*
    this.orderIntervalOptions=[ {label: 'Audi', value: 'Audi'},
                                {label: 'BMW', value: 'BMW'}];
    */
    this.dataService.postJsonDefaultParam(this.ctrlUrl + "queryOrderIntervalOptions", "").subscribe((carrier:Carrier)=>{
        this.orderIntervalOptions = carrier.attributeMap["orderIntervalOptions"];
        
        //讓畫面新增一筆空的 
        this.addNewRow();
    },error=>this.handleError(error));

    this.dataService.postJsonDefaultParam("oajcVendorCtrl/queryVendorOption", "").subscribe((carrier:Carrier)=>{
        this.vendorVOs = carrier.attributeMap["vendorVOs"];
        
    },error=>this.handleError(error));
  }

  //根據第一個時段選項，設定截止時間
  genVendorScheduleVO(){
    var vo = new VendorScheduleVO();
    if(this.orderIntervalOptions!=null && this.orderIntervalOptions!= undefined && this.orderIntervalOptions.length>0){
      if(this.orderIntervalOptions[0].deadLine!=null &&  this.orderIntervalOptions[0].deadLine!=""){
          vo.orderInterval = this.orderIntervalOptions[0].value;
          vo.deadline_t = this.orderIntervalOptions[0].deadLine;
      }
    }
    return vo;
  }  

  ngOnInit() {

  }

  handleError(error){
    this.msg = "系統發生異常";
    console.log( error);
  }

  query(){
    var data = {"orderDateS_qry":this.orderDateS_qry, "orderDateE_qry":this.orderDateE_qry};    
    this.dataService.postJsonSeperateParam(this.ctrlUrl+"query", data).subscribe((carrier:Carrier)=>{
        this.msg = carrier.attributeMap["msg"];
        this.VendorScheduleVOs = carrier.attributeMap["VendorScheduleVOs"];
    }, error=>this.handleError(error));
  }

  create(){

      this.dataService.postJsonDefaultParam(this.ctrlUrl+"create", this.getCheckedDataArray()).subscribe((carrier:Carrier)=>{
          this.msg = carrier.attributeMap["msg"];
          this.VendorScheduleVOs = carrier.attributeMap["VendorScheduleVOs"];
      }, error=>this.handleError(error));
  }

  //取得有勾選的資料
  getCheckedDataArray(){
    var data = new Array();
      for(var i=0;i<this.VendorScheduleVOs.length;i++){
          if(this.VendorScheduleVOs[i].checkBox=="1"){
              data.push(this.VendorScheduleVOs[i]);
          }
      }
      return data;
  }

  update(){
      this.dataService.postJsonDefaultParam(this.ctrlUrl+"update", this.getCheckedDataArray()).subscribe((carrier:Carrier)=>{
          this.msg = carrier.attributeMap["msg"];
          this.VendorScheduleVOs = carrier.attributeMap["VendorScheduleVOs"];
      },error=>this.handleError(error));
  }

  delete(){
    this.dataService.postJsonDefaultParam(this.ctrlUrl+"delete", this.getCheckedDataArray()).subscribe((carrier:Carrier)=>{
        this.msg = carrier.attributeMap["msg"];
        this.VendorScheduleVOs = carrier.attributeMap["VendorScheduleVOs"];
    },error=>this.handleError(error));
  } 

  addNewRow(){
    //最後一列自動增列
    /*
    var parentNode = event.srcElement["parentNode"];
    if(parentNode.parentNode.parentNode.rows.length == parentNode.parentNode.rowIndex +1){
      this.VendorScheduleVOs.push(new VendorScheduleVO());
    }
    */
    this.VendorScheduleVOs.push(this.genVendorScheduleVO());
  }

  checkAll(){
    //全選或全不選
    for(var i=0;i<this.VendorScheduleVOs.length;i++){
          var vendorScheduleVO = this.VendorScheduleVOs[i];
          vendorScheduleVO.checkBox=this.checkAllValue;
    }
    
  }

  //設定預設的截止時間
  setDeadLine(vendorScheduleVO:VendorScheduleVO){
      //這裡的做法有點特別，利用時段下拉選單已經綁定vendorScheduleVO.orderInterval，而把截止時間改成設定的值
      for(var i=0;i<this.orderIntervalOptions.length;i++){
          var oderInterVal = this.orderIntervalOptions[i];
          if(oderInterVal.value==vendorScheduleVO.orderInterval){
            //console.log("oderInterVal.deadLine=" + oderInterVal.deadLine);
            vendorScheduleVO.deadline_t = oderInterVal.deadLine;
          }
      }
      
  }
 
}

class OrderInterval{
  //時段代碼
  value:string;
  //時段名稱
  label:string;
  deadLine:string;
}