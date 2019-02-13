import { Component, OnInit } from '@angular/core';
import {EmpVO} from '../vo/EmpVO';
import {DataService} from '../data.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css'],
  
})
export class EmpListComponent implements OnInit {
  
  empVOs:EmpVO[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    /*
    this.empVOs = [{
      compId:'1',
      empNo:'2',
      chiName: '3',
      depNo: 'xxx',
      postName: 'xx',
      cellphone:'xx',
      ext: 'xx',
      directNo:'xx',
      email:'xx'
    }];
    */
    
  }

}
