import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import {Carrier } from '../dataExchange/Carrier';
import {Util} from '../util/Util';

@Component({
  selector: 'app-meal-order-report',
  templateUrl: './meal-order-report.component.html',
  styleUrls: ['./meal-order-report.component.css']
})
export class MealOrderReportComponent implements OnInit {
  twLocale = Util.getCalendarLocale();
  msg:string="歡迎";
  ctrlUrl = "oajcMealOrderReportCtrl/";
  orderDateS_qry:string="";
  orderDateE_qry:string="";

  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  //產生便當訂購明細報表
  orderDetailReport(){
      var data = {"orderDateS_qry":this.orderDateS_qry, "orderDateE_qry":this.orderDateE_qry};   
      this.dataService.postJsonSeperateParam(this.ctrlUrl + "orderDetailReport", data).subscribe((carrier:Carrier)=>{
        
         window.open("http://" + window.location.hostname + "/erp/public/dx/oa/" + carrier.attributeMap["fileName"]);
         this.msg = carrier.attributeMap["msg"];
      }, error=>{this.handleError(error)});
  }

  //產生便當扣款明細報表
  deductionDetailReport(){
      
  }

  handleError(error){
    this.msg = "系統發生異常";
    console.log( error);
  }
}
