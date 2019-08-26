import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { DataService } from '../dataExchange/data.service';
import { Util } from '../util/Util';
import { Carrier} from '../dataExchange/Carrier';
import { MealOrderVO } from '../vo/MealOrderVO';
import { VendorScheduleVO } from '../vo/vendorScheduleVO';
import { MealDishVO } from '../vo/MealDishVO';
import {DialogService} from 'primeng/api';
import {MealOrderPickerComponent} from '../meal-order-picker/meal-order-picker.component';

@Component({
  selector: 'app-meal-order',
  templateUrl: './meal-order.component.html',
  styleUrls: ['./meal-order.component.css'],
  providers:[DialogService]
})
export class MealOrderComponent implements OnInit {
  ctrlUrl = "oajcMealOrderCtrl/";

  msg="歡迎";

  twLocale = Util.getCalendarLocale();
  
  orderDate_qry:string = this.datePipe.transform(new Date(), 'yyyy/MM/dd');

  orderDateArray:Array<OrderDate>=new Array();
  
  orderIntervalArray:Array<OrderInterval>=new Array();

  //key為訂購時段id,value為mealOrderVO Array
  mealOrderMap={};

  VendorScheduleVOs:Array<VendorScheduleVO>=new Array();
  //所有安排廠商的菜單資料
  mealDishVOs:Array<MealDishVO>=new Array();

  constructor(private dataService:DataService, private datePipe:DatePipe, public dialogService: DialogService) {    
    
  }

  ngOnInit() {
    this.query();
  }

  confirmOrder(){
      this.dataService.postJsonDefaultParam(this.ctrlUrl+"confirmOrder", this.mealOrderMap).subscribe((carrier:Carrier)=>{
          this.msg = carrier.attributeMap["msg"];
          this.mealOrderMap = carrier.attributeMap["mealOrderMap"];
      }, error=>this.handleError(error));
  }

  query(){
    this.dataService.postJsonDefaultParam(this.ctrlUrl+"query", this.orderDate_qry).subscribe((carrier:Carrier)=>{
      this.assignData(carrier);
    }, error=>this.handleError(error));
  }

  assignData(carrier:Carrier){
    this.msg = carrier.attributeMap["msg"];
    this.orderIntervalArray = carrier.attributeMap["orderIntervalArray"];
    this.orderDateArray = carrier.attributeMap["orderDateArray"];
    this.mealOrderMap = carrier.attributeMap["mealOrderMap"];
    this.mealDishVOs = carrier.attributeMap["mealDishVOs"];
    this.VendorScheduleVOs = carrier.attributeMap["VendorScheduleVOs"];
    //this.orderDate_qry = carrier.attributeMap["orderDate_qry"];
    this.orderDate_qry = Util.toSlashDate(carrier.attributeMap["orderDate_qry"]);
  }

  queryLastWeek(){
    this.dataService.postJsonDefaultParam(this.ctrlUrl+"queryLastWeek", this.orderDate_qry).subscribe((carrier:Carrier)=>{
      this.assignData(carrier);
    }, error=>this.handleError(error));
  }

  queryNextWeek(){
    this.dataService.postJsonDefaultParam(this.ctrlUrl+"queryNextWeek", this.orderDate_qry).subscribe((carrier:Carrier)=>{
      this.assignData(carrier);
    }, error=>this.handleError(error));
  }

  getMealOrderArray(orderInterval:OrderInterval){
    return this.mealOrderMap[orderInterval.id];
  }

  handleError(error){
    this.msg = "系統發生異常";
    console.log( error);
  }

  getVendorSchedules(orderDate:string, orderIntervalId:string){
    var vendorScheduleVOarray = new Array();
    
    for(var i=0;i<this.VendorScheduleVOs.length;i++){
      var vendorScheduleVO = this.VendorScheduleVOs[i];
      if(vendorScheduleVO.orderDate==orderDate && vendorScheduleVO.orderInterval==orderIntervalId){
        vendorScheduleVOarray.push(vendorScheduleVO);
      }
    }
    //console.log("vendorScheduleVOarray.len="+ vendorScheduleVOarray.length );
    return vendorScheduleVOarray;
  }

  changeMealSelect(trIdx:string, tdIdx:string){
      var vendorIdSelectObj:any =document.getElementById("vendorId" + trIdx + tdIdx);
      var vendorId = vendorIdSelectObj.options[vendorIdSelectObj.selectedIndex].value;
      //console.log("廠商id:" + vendorId);
      var mealIdSelectObj:any = document.getElementById("mealId" + trIdx + tdIdx);
      //重新從server取得廠商有哪些餐點資料
      /*
      this.dataService.postJsonDefaultParam("oajcMealEditCtrl/queryByVendorId", vendorId).subscribe((carrier:Carrier)=>{
        this.msg = carrier.attributeMap["msg"];
        var mealVOArray = carrier.attributeMap["mealVOList"];
        var firstOption = mealIdSelectObj.options[0];
        firstOption.setAttribute("cost",0);
        //只保留第一個選項
        mealIdSelectObj.options.length = 0;
        mealIdSelectObj.add(firstOption);

        for(var i=0;i<mealVOArray.length;i++){
          var mealVO:MealVO=mealVOArray[i];
          mealVO.mealName=mealVO.mealName + "(" + mealVO.cost + "元)";
          var option = new Option(mealVO.mealName, mealVO.mealId);
          option.setAttribute("cost", mealVO.cost+"");          
          mealIdSelectObj.add(option);
        }
      }, error=>this.handleError(error));
      */
     
  }

  /*
  changeOrderCost(trIdx:string, tdIdx:string, mealOrderVO:MealOrderVO){
    var mealIdSelectObj:any = document.getElementById("mealId" + trIdx + tdIdx);
    var mealSelectedOption = mealIdSelectObj.options[mealIdSelectObj.selectedIndex];
    
    if(mealOrderVO.orderAmount==0 ){
          //預設訂購數量
          mealOrderVO.orderAmount=1;
    }
    //已經沒有cost attribute了,底下寫法會失效
    mealOrderVO.orderCost = mealOrderVO.orderAmount*mealSelectedOption.getAttribute("cost");
  }
  */

  calculateCost(trIdx:string, tdIdx:string, mealOrderVO:MealOrderVO){
    if(isNaN(mealOrderVO.orderAmount)){
          alert("數量請輸入正整數");
          return false;
    }

    this.calculateCostInVO(mealOrderVO);
    /*
    for(var i=0;i<this.mealDishVOs.length;i++){
      var mealDishVO = this.mealDishVOs[i];
      if(mealDishVO.vendorId==mealOrderVO.vendorId && mealDishVO.mealId==mealOrderVO.mealId){
        mealOrderVO.orderCost = mealOrderVO.orderAmount*mealDishVO.cost;
      }
    }
    */
  }
  
  calculateCostInVO(mealOrderVO:MealOrderVO){
    for(var i=0;i<this.mealDishVOs.length;i++){
      var mealDishVO = this.mealDishVOs[i];
      if(mealOrderVO.mealId==""){
        //取消訂購時
        mealOrderVO.orderCost=0;
      }else if(mealDishVO.vendorId==mealOrderVO.vendorId && mealDishVO.mealId==mealOrderVO.mealId){
        mealOrderVO.orderCost = mealOrderVO.orderAmount*mealDishVO.cost;
      }
    }
  }

  getMealDishVO(mealOrderVO:MealOrderVO){
      //某間廠商的所有菜單Array
      var mealDishVOsOfVendor = new Array();
      for(var i=0;i<this.mealDishVOs.length;i++){
          var mealDishVO = this.mealDishVOs[i];
          if(mealDishVO.vendorId==mealOrderVO.vendorId && 
                mealDishVO.orderDate==mealOrderVO.orderDate && mealDishVO.orderInterval==mealOrderVO.orderInterval){
            mealDishVOsOfVendor.push(this.mealDishVOs[i]);
          }
      }
      return mealDishVOsOfVendor;
  }

  //開啟訂餐挑選畫面
  openMealOrderPicker(orderDate:string, orderIntervalId:string){

      var vendorScheduleVOs = this.getVendorSchedules(orderDate, orderIntervalId);
      const ref = this.dialogService.open(MealOrderPickerComponent, {
          data:{ vendorScheduleVOs:vendorScheduleVOs, mealDishVOs:this.mealDishVOs},
          header: '挑選廠商和餐點',
          width: '40%'
      });

      
      ref.onClose.subscribe((returnData: any) => {
        if(returnData!=null && returnData!=undefined){
          var mealOrderArray = this.mealOrderMap[orderIntervalId];
          for(var i=0;i<mealOrderArray.length;i++){
              var mealOrderVO = mealOrderArray[i];
              if(mealOrderVO.orderDate==orderDate && mealOrderVO.orderInterval==orderIntervalId){
                  mealOrderVO.vendorId=returnData["vendorId"];
                  mealOrderVO.mealId=returnData["mealId"];
                  if(returnData["mealId"]==""){
                    //沒有餐點代碼為取消訂購，將訂購數量歸零
                    mealOrderVO.orderAmount=0;                    
                  }else if(mealOrderVO.orderAmount==0){
                    mealOrderVO.orderAmount=1;
                  }
                  this.calculateCostInVO(mealOrderVO);
                  break;
              }
          }
          /*
          console.log("resp.vendorId=" + returnData["vendorId"]);
          console.log("resp.mealId=" + returnData["mealId"]);
          */
        }
        
    });
  }

  setVOaddRice(mealOrderVO:MealOrderVO, event){
    mealOrderVO.addRice = event?"1":"";
  }
}

class OrderDate{
  date:string;
  dayOfWeek:string;
}

class OrderInterval{
  id:string;
  name:string;
}

