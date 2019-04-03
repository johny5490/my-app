import { Component, OnInit } from '@angular/core';

import {EmpVO} from '../vo/EmpVO';
import { DataService } from '../dataExchange/data.service';
import {Carrier } from '../dataExchange/Carrier';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  
  ctrlUrl = "/api/EmpCtrl";

  empVOs:EmpVO[];
  msg:string="歡迎";
  constructor(private dataService:DataService) { }

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
    /*
    this.dataService.postJson(this.ctrlUrl + "/export.do", this.empVOs).toPromise().then(
      res => {
          let file = new File([res.json()], "mm.xls", { type: "application/vnd.ms-excel" });
          var objUrl = URL.createObjectURL(file);
          window.open(objUrl);
          URL.revokeObjectURL(objUrl)
      });
      */
  }
}
