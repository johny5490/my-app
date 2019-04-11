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
  //由外部傳入用於預設員工編號的預設選項
  @Input() value:string;
  @Output() valueChange = new EventEmitter();

  visible:boolean;
  selectDept:string;
  selectEmp:string;
  selectEmpName:string;

  deptVOs:DeptVO[];
  empVOs:EmpVO[];

  constructor(private dataService:DataService) {
    
  }

  ngOnInit() {
    this.queryDeptVOs();
  }

  qryEmp(deptNo:string){
    return this.dataService.postString(this.ctrlUrl+"/qryEmp.do", deptNo);
  }

  //挑選部門
  pickDept(){    
    this.qryEmp(this.selectDept).subscribe((carrier:Carrier)=>{
          this.empVOs = carrier.attributeMap["empList"];
    },error=>console.log( error));
  }
  

  pickUser(event){
    this.value=this.selectEmp;
    //this.selectEmpName=empName;
    var selectObj = event.srcElement;
    this.selectEmpName=selectObj.options[selectObj.selectedIndex].innerText;
    this.visible=false;
    this.valueChange.emit(this.value);
  }

  
  //開啟使用者挑選清單
  showUserPicker(){
    var loginUserVO = LoginUtil.getLoginUser();
   
    if(this.value!=null && this.value!=undefined && this.value!==""){
        //使用者輸入欄已有值時，預設將使用者選單選到該選項,部門選單則不選到任何值
        this.selectDept="";
        this.qryEmpBySameDept(this.value);
    }else{
        //使用者輸入欄無值時，選單預設選到為登入者的部門和職鯿
        this.selectDept=loginUserVO.deptNo;
        this.qryEmpBySameDept(loginUserVO.userId);
    }

    this.visible = true;
  }

  qryEmpBySameDept(empNo:string){
    this.dataService.postString(this.ctrlUrl+"/qryEmpBySameDept.do", empNo).subscribe((carrier:Carrier)=>{
      this.empVOs = carrier.attributeMap["empList"];
      this.selectEmp=empNo;      
    }, error=>{console.error(error)});
  }

  queryDeptVOs(){
    this.dataService.postJson(this.ctrlUrl+"/qryAllDept.do").subscribe((carrier:Carrier)=>{
      this.deptVOs = carrier.attributeMap["deptList"];
    },error=>console.log( error));
  }

  valueChg(event){
      this.value=event;
      this.valueChange.emit(this.value);
  }
}

export class DeptVO{
  deptNo:string;
  deptName:string;
}

export class EmpVO{
  USERNO:string;
  CNAME:string;
  DEPNO:string;
}