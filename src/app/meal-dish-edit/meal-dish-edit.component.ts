import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import { Carrier} from '../dataExchange/Carrier';
import {DatePipe} from "@angular/common";
import { Util } from '../util/Util';
import {MealDishVO} from '../vo/MealDishVO';

@Component({
  selector: 'app-meal-dish-edit',
  templateUrl: './meal-dish-edit.component.html',
  styleUrls: ['./meal-dish-edit.component.css']
})
export class MealDishEditComponent implements OnInit {
  twLocale = Util.getCalendarLocale();
 
  orderDateS_qry:string=this.datePipe.transform(new Date(), 'yyyy/MM/dd');
  orderDateE_qry:string="";
  msg="歡迎";
  ctrlUrl = "oajcMealDishEditCtrl/";

  mealDishVOs:Array<MealDishVO>=new Array();
  checkAllValue:string="";
  
  constructor(private dataService:DataService, private datePipe:DatePipe) { 

  }

  ngOnInit() {

  }

  query(){
    var data = {"orderDateS_qry":this.orderDateS_qry, "orderDateE_qry":this.orderDateE_qry};    
    this.dataService.postJsonSeperateParam(this.ctrlUrl+"query", data).subscribe((carrier:Carrier)=>{
        this.msg = carrier.attributeMap["msg"];
        this.mealDishVOs = carrier.attributeMap["mealDishVOs"];
    }, error=>this.handleError(error));
  }

  //取得有勾選的資料
  getCheckedDataArray(){
    var data = new Array();
      for(var i=0;i<this.mealDishVOs.length;i++){
          if(this.mealDishVOs[i].checkBox=="1"){
              data.push(this.mealDishVOs[i]);
          }
      }
      return data;
  }  

  uploadFile(event){
    let fileList: FileList = event.target.files;
    const fileLength = fileList.length;
    const formData: FormData = new FormData();

    for (let index = 0; index < fileLength; index++) {
      let singleFile = fileList.item(index);
      formData.append('files', singleFile);
      //console.log("file Name=" + singleFile.name);
    }

    this.dataService.postNoHeader(this.ctrlUrl+"uploadFile", formData).subscribe((carrier:Carrier)=>{
      this.msg = carrier.attributeMap["msg"];
      event.target.value="";
    },error=>console.log( error));
  }

  downloadFile(){
    //原本呼叫postJsonRespBlob
    this.dataService.postJsonRespBlob(this.ctrlUrl + "downloadFile", "").subscribe((results:any) => {

     var objContent = new Blob([results], { 'type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      
      //var objContent = new File([results], "mm.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          //IE
          window.navigator.msSaveOrOpenBlob(objContent, "菜單匯入檔.xls");
      }else{
          var objUrl = URL.createObjectURL(objContent);
          window.open(objUrl);
          URL.revokeObjectURL(objUrl);
      }
    });
    
  }

  doPost(actionName:string,ctrlMethod:string, respVOkey:string, data:any){
    if(!Util.showConfirmMsg(actionName)){
      return; 
    }

    this.dataService.postJsonDefaultParam(this.ctrlUrl + ctrlMethod, data).subscribe((carrier:Carrier)=>{
      this.msg = carrier.attributeMap["msg"];
      if(carrier.attributeMap[respVOkey] != undefined && carrier.attributeMap[respVOkey]!=null){
        this.mealDishVOs = carrier.attributeMap[respVOkey];
      }
    }, error=>{this.handleError(error)});
  }
  
  handleError(error){
    this.msg = "系統發生異常";
    console.log( error);
  }

  doSeparatePost(actionName:string,ctrlMethod:string, respVOkey:string, data:any){
    if(!Util.showConfirmMsg(actionName)){
      return; 
    }

    this.dataService.postJsonSeperateParam(this.ctrlUrl + ctrlMethod, data).subscribe((carrier:Carrier)=>{
      this.msg = carrier.attributeMap["msg"];
      if(carrier.attributeMap[respVOkey] != undefined && carrier.attributeMap[respVOkey]!=null){
        this.mealDishVOs = carrier.attributeMap[respVOkey];
      }
    }, error=>{this.handleError(error)});
  }
  

  delete(){
    var data ={mealDishVOs: this.getCheckedDataArray(), orderDateS_qry:this.orderDateS_qry, orderDateE_qry:this.orderDateE_qry};
    this.doSeparatePost("刪除","delete","mealDishVOs",data);
  }

  checkAll(){
    //全選或全不選
    for(var i=0;i<this.mealDishVOs.length;i++){
          var vo = this.mealDishVOs[i];
          vo.checkBox=this.checkAllValue;
    }
    
  }
}
