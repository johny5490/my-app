import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import { AtrVOiface } from '../vo/AtrVOiface';
import {Util} from '../util/Util';
import {Carrier} from '../dataExchange/Carrier';

@Component({
  selector: 'app-atr-edit',
  templateUrl: './atr-edit.component.html',
  styleUrls: ['./atr-edit.component.css']
})
export class AtrEditComponent implements OnInit {
  ctrlUrl = "/api/AtrCtrl";

  atrVOs:AtrVOiface[];

  atrVO:AtrVOiface = {};

  msg:string='歡迎';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.qryAllAtrList();

  }

  qryAllAtrList(){
  
    this.dataService.postJsonDefaultParam(this.ctrlUrl +"/qryAllAtrList.do").
          subscribe((carr:Carrier)=>{
                      
                      this.atrVOs=carr.attributeMap["atrList"];
                  },error => console.log(error));
  }

  create(){
      if(!Util.showConfirmMsg("新增")){
        return; 
      }
      
      this.dataService.createAtr(this.atrVO).
          subscribe((carrier:Carrier) => {
            
            this.msg = carrier.attributeMap["msg"];
            this.cleanAndQryAtrList();
          }, error => console.log("error=" + error));
      
  }

  private cleanAndQryAtrList(){
      //清空內容
      this.atrVO={};
      //重查清單內容
      this.qryAllAtrList();
  }

  update(){
      if(!Util.showConfirmMsg("修改")){
        return;
      }
      this.dataService.updateAtr(this.atrVO).
          subscribe((carrier)=>{
              var msg = carrier.attributeMap["msg"];
              this.msg = msg;
              this.qryAllAtrList();
          },error=>console.log("error=" + error));
  }

  del(){
      if(!Util.showConfirmMsg("刪除")){
        return;
      } 
      this.dataService.deleteAtr(this.atrVO).
          subscribe((carrier)=>{
            var msg = carrier.attributeMap["msg"];
              this.msg = msg;
              this.cleanAndQryAtrList();
          },error=>console.log("error=" + error));; 
  }

  copyToEdit(atrVO:AtrVOiface){      
      //clone Object
      this.atrVO = JSON.parse(JSON.stringify(atrVO));;
  }
}
