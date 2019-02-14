import { Component, OnInit } from '@angular/core';

import {EmpVO} from '../vo/EmpVO';
import { DataService } from '../data.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  
  empVOs:EmpVO[];

  constructor(private dataService:DataService) { }

  ngOnInit() {
        this.dataService.qryEmpList().subscribe( empVOs =>{
               this.empVOs = empVOs;
               
        } );

  }

}
