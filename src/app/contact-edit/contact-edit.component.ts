import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import { Carrier} from '../dataExchange/Carrier';
import {Util} from '../util/Util';
import { ContactVO } from '../vo/ContactVO';
import { LoginUtil } from '../util/LoginUtil';

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
  ctrlUrl='/api/ContactCtrl';
  isAdmin:boolean;

  createBtnDisable=true;
  updateBtnDisable=true;
  deleteBtnDisable=true;

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

  query(){
    this.dataService.postString(this.ctrlUrl+"/query.do",this.contactVO_qry).
                      subscribe((carrier:Carrier)=>{
                          this.msg_qry = carrier.attributeMap["msg"];
                          if(carrier.attributeMap["contactVOList"] != undefined && carrier.attributeMap["contactVOList"] != null){
                             this.contactVOs = carrier.attributeMap["contactVOList"];
                          }
                          
                      },error=>console.log( error));
  }

  create(){
    if(!Util.showConfirmMsg("新增")){
      return; 
    }

    this.dataService.postJson(this.ctrlUrl+"/create.do",this.contactVO).
                      subscribe((carrier:Carrier)=>{
                          this.msg = carrier.attributeMap["msg"];
                          if(carrier.attributeMap["contactVO"] != undefined && carrier.attributeMap["contactVO"]!=null){
                            this.contactVO = carrier.attributeMap["contactVO"];
                         }
                      },error=>console.log( error));
  }

  update(){
    if(!Util.showConfirmMsg("修改")){
      return; 
    }
    this.dataService.postJson(this.ctrlUrl+"/update.do",this.contactVO).
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
    this.dataService.postJson(this.ctrlUrl+"/delete.do",this.contactVO).
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
