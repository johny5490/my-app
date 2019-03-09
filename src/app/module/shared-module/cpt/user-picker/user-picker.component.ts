import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {DataService} from '../../../../dataExchange/data.service';
import {Carrier} from '../../../../dataExchange/Carrier';
import {LoginUtil} from '../../../../util/LoginUtil';
import{LoginUserVO} from '../../../../vo/LoginUserVO';
import { Observable } from 'rxjs';

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
  selectEmpName:string;

  deptVOs:DeptVO[];
  empVOs:EmpVO[];

  constructor(private dataService:DataService) {
    this.dataService.postJson(this.ctrlUrl+"/qryAllDept.do").subscribe((carrier:Carrier)=>{
        this.deptVOs = carrier.attributeMap["deptList"];
    });
  }

  ngOnInit() {
    var loginUserVO = LoginUtil.getLoginUser();
   
    if(this.value!=null && this.value!=undefined){
        //使用者輸入欄已有值時，預設將使用者選單選到該選項
        this.selectEmp=this.value;
    }else{
      this.qryEmp(loginUserVO.deptNo).subscribe((carrier:Carrier)=>{
          this.empVOs = carrier.attributeMap["empList"];
          //使用者輸入欄無值時，選單預設選到為登入者的部門和職鯿
          this.selectDept=loginUserVO.deptNo;
          this.selectEmp=loginUserVO.userId;
      });
        
    }
    
  }

  qryEmp(deptNo:string){
    return this.dataService.postString(this.ctrlUrl+"/qryEmp.do", deptNo);
  }

  pickDept(){
    //this.visible=false;
    //this.value=this.selectDept;
    //this.valueChange.emit(this.value);
    
    this.qryEmp(this.selectDept).subscribe((carrier:Carrier)=>{
          this.empVOs = carrier.attributeMap["empList"];
    });
  }

  pickUser(empName){
    this.value=this.selectEmp;
    this.selectEmpName=empName;
    this.visible=false;
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
  USERNO:string;
  CNAME:string;
}