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

}
