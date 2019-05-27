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
  ctrlUrl = "osjcEmpCtrl/";
  //由外部傳入用於預設員工編號的預設選項
  @Input() value:string;
  @Output() valueChange = new EventEmitter();

  visible:boolean;
  selectDept:string;
  selectEmp:string;
  selectEmpName:string;

  deptVOs:Array<DeptVO>;
  empVOs:Array<EmpVO>;

  constructor(private dataService:DataService) {
    
  }

  ngOnInit() {
    this.queryDeptVOs();
  }

  qryEmp(deptNo:string){
    //return this.dataService.postString(this.ctrlUrl+"qryEmp", deptNo);
    return this.dataService.postJsonDefaultParam(this.ctrlUrl+"qryEmp", deptNo);
  }

  //挑選部門
  pickDept(){    
    this.qryEmp(this.selectDept).subscribe((carrier:Carrier)=>{
          //this.empVOs = carrier.attributeMap["empList"];
          this.setEmpVos(carrier);
    },error=>console.log( error));
  }
  

  pickUser(event){
    this.value=this.selectEmp;
    //this.selectEmpName=empName;
    var selectObj = event.srcElement;
    //此段在Chrome會錯誤
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
    this.dataService.postJsonDefaultParam(this.ctrlUrl+"qryEmpBySameDept", empNo).subscribe((carrier:Carrier)=>{
      //this.empVOs = carrier.attributeMap["empList"];
      this.setEmpVos(carrier);
      this.selectEmp=empNo;      
    }, error=>{console.error(error)});
  }

  setEmpVos(carrier:Carrier){
    var mapArray = carrier.attributeMap["empList"];
    this.empVOs = new Array();
    for(var i=0;i<mapArray.length ;i++){
        var map = mapArray[i];
        var empVO = new EmpVO();
        empVO.userNo = map["USERNO"];
        empVO.cname = map["CNAME"];
        empVO.deptNo = map["DEPTNO"];
        this.empVOs.push(empVO);
    }
  }

  queryDeptVOs(){
    this.dataService.postJsonDefaultParam(this.ctrlUrl+"qryAllDept").subscribe((carrier:Carrier)=>{
      
        //this.deptVOs = carrier.attributeMap["deptList"];
        var mapArray = carrier.attributeMap["deptList"];
        this.deptVOs = new Array();
        
        for(var i=0;i<mapArray.length ;i++){
          var map = mapArray[i];
          var deptVO = new DeptVO();
          deptVO.deptNo = map["DEPTNO"];
          deptVO.deptName = map["DEPTNAME"];
          this.deptVOs.push(deptVO);
          //console.log("DEPTNO=" + map["DEPTNO"]);
        }
        
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
  userNo:string;
  cname:string;
  deptNo:string;
}