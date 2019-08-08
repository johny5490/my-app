import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import {Util} from '../util/Util';
import {Carrier} from '../dataExchange/Carrier';
import {VendorEditComponent} from '../vendor-edit/vendor-edit.component';
import {MealEditComponent} from '../meal-edit/meal-edit.component';

@Component({
  selector: 'app-vendor-meal-edit',
  templateUrl: './vendor-meal-edit.component.html',
  styleUrls: ['./vendor-meal-edit.component.css']
})
export class VendorMealEditComponent implements OnInit {

  vendorId_qry:string="";

  ctrlUrl="oajcVendorCtrl/";

  //切換摺頁，第一個為0依此類推
  activeTabIndex:number=0;

  //進階查詢是否顯示
  visible:boolean=false;

  @ViewChild('vendorEdit') vendorEdit:VendorEditComponent;
  @ViewChild('mealEdit') mealEdit:MealEditComponent;

  constructor(private dataService:DataService) { 
    dataService.eventBus.subscribe(event=>{
        if(event.name=="queryVendor"){
          this.doPost("查詢", "query", "vendorVO",event.value);
          this.vendorId_qry = event.value;
          this.visible=false;
        }
    });
  }

  ngOnInit() {
  }

  query(){
      this.doPost("查詢", "query", "vendorVO",this.vendorId_qry);
  }

  advanceQuery(){
    this.visible=true;
  }

  //處理摺頁切換
  handleTabChange(event){
      //console.log("event.index=" + event.index);
      if(event.index==1){
          
          //切換為餐點基本資料摺頁時查詢廠商下的餐點資料
          this.mealEdit.queryByVendorId(this.vendorEdit.vendorVO.vendorId);
      }
  }

  doPost(actionName:string,ctrlMethod:string, respVOkey:string, data:any){
    /*
    if(!Util.showConfirmMsg(actionName)){
      return; 
    }
    */
    this.dataService.postJsonDefaultParam(this.ctrlUrl + ctrlMethod, data).subscribe((carrier:Carrier)=>{
      this.vendorEdit.msg = carrier.attributeMap["msg"];
      this.activeTabIndex = 0;
      //console.log("activeTabIndex");
      if(carrier.attributeMap[respVOkey] != undefined && carrier.attributeMap[respVOkey]!=null){
        //this.vendorVO = carrier.attributeMap[respVOkey];
        this.vendorEdit.vendorVO =  carrier.attributeMap[respVOkey];
        
      }
    }, error=>{this.handleError(error)});
  }

  handleError(error){
    //this.msg = "系統發生異常";
    console.log( error);
  }
}
