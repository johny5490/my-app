import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import { MealVO } from '../vo/MealVO';
import {Carrier} from '../dataExchange/Carrier';
import {Util} from '../util/Util';
import { PaginatorComponent } from '../module/shared-module/cpt/paginator/paginator.component';

@Component({
  selector: 'app-meal-edit',
  templateUrl: './meal-edit.component.html',
  styleUrls: ['./meal-edit.component.css']
})
export class MealEditComponent implements OnInit {

  ctrlUrl="oajcMealEditCtrl/";
  mealVO:MealVO = new MealVO();
  msg:string ="歡迎";
  //分頁元件的資料源
  dataSource = "com.sdms.oa.dataSource.oajcMealPaginatorDataSource";

  mealMapArray:Array<any>=[];
  //廠商選單
  vendorVOs={};

  //@Input() vendorId_qry:string = "";

  @ViewChild('paginator') paginator: PaginatorComponent;

  constructor(private dataService:DataService) { 
    this.queryVendors();
  }

  ngOnInit() {
  }

  //查詢廠商選單
  queryVendors(){
    this.dataService.postJsonDefaultParam("oajcVendorCtrl/queryVendorOption", "").subscribe((carrier:Carrier)=>{
      this.vendorVOs = carrier.attributeMap["vendorVOs"];      
    },error=>this.handleError(error));
  }

  //提供給vendor-meal-edit component切換為餐點基本資料摺頁時查詢廠商下的餐點資料
  queryByVendorId(vendorId:string){
    
    //this.doPost("queryByVendorId", "vendorVO", vendorId);
    this.paginator.doQuery(vendorId);
    this.queryVendors();
  }

  create(){
    if(!Util.showConfirmMsg("新增")){
      return; 
    }
    this.doPost("create","mealVO", this.mealVO);
  }

  update(){
    if(!Util.showConfirmMsg("修改")){
      return; 
    }
    this.doPost("update","mealVO", this.mealVO);
  }

  delete(){
    if(!Util.showConfirmMsg("刪除")){
      return; 
    }
    this.doPost("delete","mealVO", this.mealVO);
  }

  doPost(ctrlMethod:string, respVOkey:string, data:any){
    
    this.dataService.postJsonDefaultParam(this.ctrlUrl + ctrlMethod, data).subscribe((carrier:Carrier)=>{
      this.msg = carrier.attributeMap["msg"];
      if(carrier.attributeMap[respVOkey] != undefined && carrier.attributeMap[respVOkey]!=null){
        this.mealVO = carrier.attributeMap[respVOkey];
        //重查餐點分頁清單
        this.paginator.doQuery(this.mealVO.vendorId);
      }
    }, error=>{this.handleError(error)});
  }

  handleError(error){
    this.msg = "系統發生異常";
    console.log( error);
  }

  query(mealMap){
    this.doPost("query","mealVO", mealMap);
  }

  onAfterQuery(event){
    
    this.mealMapArray = event["data"];
  }
}
