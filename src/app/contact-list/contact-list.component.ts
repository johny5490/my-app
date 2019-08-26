import { Component, OnInit } from '@angular/core';

import {EmpVO} from '../vo/EmpVO';
import { DataService } from '../dataExchange/data.service';
import {Carrier } from '../dataExchange/Carrier';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoginUtil} from '../util/LoginUtil';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  msg:string="歡迎";
  ctrlUrl = "oajcContactListCtrl/";

  empVOs:Array<EmpVO>=new Array();
  //一級單位在職人員,每個map為<部門,人數>
  oneLevelWorkingArray = new Array();
  //二級單位在職人員
  twoLevelWorkingArray = new Array();
  //全公司在職人員人數
  companyWorking:string;

  constructor(private dataService:DataService, private http: HttpClient) { }

  ngOnInit() {
   
        this.dataService.postJsonDefaultParam(this.ctrlUrl + "qryEmpList").subscribe((carrier:Carrier)=>{
              
              var msg = carrier.attributeMap["msg"];
              
              if(msg !=null && msg != undefined){
                  alert(msg);
              }
              
              //this.empVOs = carrier.attributeMap["empList"];
              this.setEmpVOs(carrier);
              this.oneLevelWorkingArray = carrier.attributeMap["oneLevelWorkingArray"];
              this.twoLevelWorkingArray = carrier.attributeMap["twoLevelWorkingArray"];
              this.companyWorking = carrier.attributeMap["companyWorking"];
            },error=>console.log( error));
  }

  setEmpVOs(carrier:Carrier){
      var mapArray = carrier.attributeMap["empList"];
      for(var i=0;i<mapArray.length;i++){
          this.empVOs.push(this.mapToEmpVO(mapArray[i]));
      }
  }

  mapToEmpVO(map):EmpVO{
    var empVO = new EmpVO();
    empVO.chiName = map["CHINAME"];
    empVO.depNo = map["DEPNO"];
    empVO.directNo = map["DIRECTNO"];
    empVO.email =map["EMAIL"];
    empVO.empNo = map["EMPNO"];
    empVO.phone = map["PHONE"];
    empVO.postName= map["POSTNAME"];
    return empVO;
  }

  export(){
    //原本呼叫postJsonRespBlob
    this.dataService.postJsonRespBlob(this.ctrlUrl + "export", this.empVOs).subscribe((results:any) => {

     var objContent = new Blob([results], { 'type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      
      //var objContent = new File([results], "mm.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          //IE
          window.navigator.msSaveOrOpenBlob(objContent, "通訊錄.xlsx");
      }else{
          var objUrl = URL.createObjectURL(objContent);
          window.open(objUrl);
          URL.revokeObjectURL(objUrl);
      }
      
      /*
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(objContent);
      link.download = "mm.xlsx";
      link.click();
      */
    });
    
  }

}
