import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {VendorScheduleVO} from '../vo/vendorScheduleVO';
import {MealDishVO} from '../vo/MealDishVO';


@Component({
  selector: 'app-meal-order-picker',
  templateUrl: './meal-order-picker.component.html',
  styleUrls: ['./meal-order-picker.component.css']
})
export class MealOrderPickerComponent implements OnInit {

  vendorId:string="";
  mealId:string="";
  vendorScheduleVOs:Array<VendorScheduleVO>;
  //所有安排廠商的菜單資料
  mealDishVOs:Array<MealDishVO>=new Array();

  constructor(public dialogService: DialogService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { 
      
  }

  ngOnInit() {
    this.vendorScheduleVOs = this.config.data.vendorScheduleVOs;
    this.mealDishVOs = this.config.data.mealDishVOs;
  }

  pickConfirm(){
    var pickedData = {vendorId:this.vendorId,mealId:this.mealId};
    this.ref.close(pickedData);
  }

  cancel(){
      this.ref.close();
  }

  getMealDishVO() {
    //某間廠商的所有菜單Array
    var mealDishVOsOfVendor = new Array();
    if (this.vendorScheduleVOs != null && this.vendorScheduleVOs.length > 0) {

      for (var i = 0; i < this.mealDishVOs.length; i++) {
        var mealDishVO = this.mealDishVOs[i];
        if (mealDishVO.vendorId == this.vendorId &&
          mealDishVO.orderDate == this.vendorScheduleVOs[0].orderDate && mealDishVO.orderInterval == this.vendorScheduleVOs[0].orderInterval) {
          mealDishVOsOfVendor.push(this.mealDishVOs[i]);
        }
      }
    }
    return mealDishVOsOfVendor;
  }
}
