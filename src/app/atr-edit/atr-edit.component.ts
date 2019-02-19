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
    this.queryAtrList();

  }

  queryAtrList(){
  
    this.dataService.postJson(this.ctrlUrl +"/queryAtrList.do").
          subscribe((artVOArray:AtrVOiface[])=>{
                      this.atrVOs=artVOArray;
                  },error => console.log("error=" + error));
  }

  create(){
      if(!Util.showConfirmMsg("新增")){
        return; 
      }
      
      this.dataService.createAtr(this.atrVO).
          subscribe((carrier:Carrier) => {
            
              var msg = carrier.attributeMap["msg"];
              this.msg = msg;
              console.info("carrier.msg=" + msg);
              this.cleanAndQryAtrList();
          }, error => console.log("error=" + error));    
  }

  private cleanAndQryAtrList(){
      //清空內容
      this.atrVO={};
      //重查清單內容
      this.queryAtrList();
  }

  update(){
      if(!Util.showConfirmMsg("修改")){
        return;
      }
      this.dataService.updateAtr(this.atrVO).
          subscribe((carrier)=>{
              var msg = carrier.attributeMap["msg"];
              this.msg = msg;
              this.queryAtrList();
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
