import { Component, OnInit } from '@angular/core';

import {EmpVO} from '../vo/EmpVO';
import { DataService } from '../dataExchange/data.service';
import {Carrier } from '../dataExchange/Carrier';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoginUtil} from '../util/LoginUtil';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  
  ctrlUrl = "/api/EmpCtrl";

  empVOs:EmpVO[];
  msg:string="歡迎";
  constructor(private dataService:DataService, private http: HttpClient) { }

  ngOnInit() {
   
        this.dataService.postJson(this.ctrlUrl + "/qryEmpList.do").subscribe((carrier:Carrier)=>{
              
              var msg = carrier.attributeMap["msg"];
              
              if(msg !=null && msg != undefined){
                  alert(msg);
              }
              
              this.empVOs = carrier.attributeMap["empList"];
            },error=>console.log( error));
  }

  export(){
    
    this.dataService.postJsonRespBlob(this.ctrlUrl + "/export.do", this.empVOs).subscribe((results:any) => {

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
