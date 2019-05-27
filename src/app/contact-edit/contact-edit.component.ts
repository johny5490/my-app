import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import { Carrier} from '../dataExchange/Carrier';
import {Util} from '../util/Util';
import { ContactVO } from '../vo/ContactVO';
import { LoginUtil } from '../util/LoginUtil';
import { ViewChild } from '@angular/core'
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contactVO:ContactVO=new ContactVO();
  contactVO_qry:ContactVO=new ContactVO();
  contactVOs:Array<ContactVO>=[];

  msg:string="歡迎";
  msg_qry:string="歡迎";
  ctrlUrl='oajcContactCtrl/';
  isAdmin:boolean;

  createBtnDisable=true;
  updateBtnDisable=true;
  deleteBtnDisable=true;


  //查詢SQL
  querySQL:string;

  //總筆數
  totalRecords:number=0;
  //每頁幾筆，暫時固定不提供可變更
  rowsPerPage:number=10;
  //目前頁，從0開始(算法同UI元件)
  firstRowIndex:number;

  @ViewChild('paginator') paginator: Paginator;

  constructor(private dataService:DataService) { 
    //暫時寫死管理者
    this.isAdmin= "SD0060"==LoginUtil.getLoginUser().userId?true:false;
    if(this.isAdmin){
        this.createBtnDisable=false;
        this.updateBtnDisable=false;
        this.deleteBtnDisable=false;
    }
  }

  ngOnInit() {
    
  }

  handleError(error){
    this.msg_qry = "系統發生異常";
    console.log( error);
  }

  query(pageIndex){
    
    var data = {"contactVO_qry":this.contactVO_qry, "rowsPerPage":this.rowsPerPage, "pageIndex":pageIndex};
    this.dataService.postJsonSeperateParam(this.ctrlUrl+"query", data).
                      subscribe((carrier:Carrier)=>{
                          
                          this.msg_qry = carrier.attributeMap["msg"];
                          /*
                          if(carrier.attributeMap["contactVOList"] != undefined && carrier.attributeMap["contactVOList"] != null){
                             this.contactVOs = carrier.attributeMap["contactVOList"];
                          }
                          */
                          
                          this.contactVOs = carrier.attributeMap["contactVOList"];
                          
                          this.totalRecords=carrier.attributeMap["totalRecords"];
                          
                          this.changePage(pageIndex)
                      },error=>this.handleError(error));
  }

  //變更頁碼但不發出事件，此function參考paginator changePage的souce code
  changePage(p :number) {
    this.firstRowIndex = this.paginator.rows * p;
    this.paginator.updatePageLinks();
    this.paginator.updatePaginatorState();
    
  }

  queryByPage(event){
    console.log("queryByPage");
    this.query(event.page);
  }

  create(){
    if(!Util.showConfirmMsg("新增")){
      return; 
    }

    this.dataService.postJsonDefaultParam(this.ctrlUrl+"create",this.contactVO).
                      subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          if(carrier.attributeMap["contactVO"] != undefined && carrier.attributeMap["contactVO"]!=null){
                            this.contactVO = carrier.attributeMap["contactVO"];
                         }
                      },error=>this.handleError(error));
  }

  update(){
    if(!Util.showConfirmMsg("修改")){
      return; 
    }
    this.dataService.postJsonDefaultParam(this.ctrlUrl+"update",this.contactVO).
                    subscribe((carrier:Carrier)=>{
                      this.msg = carrier.attributeMap["msg"];
                      if(carrier.attributeMap["contactVO"] != undefined && carrier.attributeMap["contactVO"]!=null){
                        this.contactVO = carrier.attributeMap["contactVO"];
                     }
                    },error=>console.log("error=" + error));
  }
   
  delete(){
    if(!Util.showConfirmMsg("刪除")){
      return; 
    }
    this.dataService.postJsonDefaultParam(this.ctrlUrl+"delete",this.contactVO).
                    subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          if(carrier.attributeMap["contactVO"] != undefined && carrier.attributeMap["contactVO"]!=null){
                            this.contactVO = carrier.attributeMap["contactVO"];
                         }
                    },error=>console.log("error=" + error));
  }

  copyToEdit(contactVO:ContactVO){

      this.contactVO = JSON.parse(JSON.stringify(contactVO));
      this.msg="查詢成功";
      var loginUserVO = LoginUtil.getLoginUser();
      if(loginUserVO.userId==contactVO.empNo){
          //自己的通訊資料可以修改
          this.updateBtnDisable=false;
      }else if(!this.isAdmin){
          this.updateBtnDisable=true;
      }
  }
}
