import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {DataService} from '../../../../dataExchange/data.service';
import {Carrier} from '../../../../dataExchange/Carrier';
import {LoginUtil} from '../../../../util/LoginUtil';

@Component({
  selector: 'app-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.css']
})
export class UserPickerComponent implements OnInit {
  ctrlUrl = "/api/EmpCtrl";
  @Input() value:string;
  @Output() valueChange = new EventEmitter();

  visible:boolean;
  selectDept:string;
  selectEmp:string;
  deptVOs:DeptVO[];
  empVOs:EmpVO[];

  constructor(private dataService:DataService) {

  }

  ngOnInit() {
    this.dataService.postJson(this.ctrlUrl+"/qryAllDept.do").subscribe((carrier:Carrier)=>{
          this.deptVOs = carrier.attributeMap["deptList"];
    });

    var deptNo = LoginUtil.getLoginUser().deptNo;

    this.dataService.postJson(this.ctrlUrl+"/qryEmp.do", deptNo).subscribe((carrier:Carrier)=>{
          this.empVOs = carrier.attributeMap["empList"];
    });
  }

  pickDept(){
    //this.visible=false;
    this.value=this.selectDept;
    this.valueChange.emit(this.value);
  }


  /*
  onHide(){
    //有選擇資料時觸發pick沒有則是noPick
    var pickedUser = {userId:"A123",userName:"姓名"};
    this.pick.emit(pickedUser);
    this.noPick.emit();
    
    this.visibleChange.emit(this.visible);
    this.valueChange.emit(this.value);
  }
  */
  showUserPicker(){
    this.visible = true;
  }
}

export class DeptVO{
  deptNo:string;
  deptName:string;
}

export class EmpVO{
  userno:string;
  cname:string;
}