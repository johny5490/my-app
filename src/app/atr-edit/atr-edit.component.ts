import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataExchange/data.service';
import { AtrVOIface } from '../vo/AtrVOIface';

@Component({
  selector: 'app-atr-edit',
  templateUrl: './atr-edit.component.html',
  styleUrls: ['./atr-edit.component.css']
})
export class AtrEditComponent implements OnInit {
  
  atrVOs:AtrVOIface[];

  atrVO:AtrVOIface = {};

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.queryAtrList();

  }

  showConfirmMsg(act:string):boolean{
      return window.confirm("確定要"+act+"?");
  }

  queryAtrList(){
    this.dataService.queryAtrList().
          subscribe((artVOArray)=>{
                this.atrVOs=artVOArray;
          },error => console.log("error=" + error));
  }

  create(){
      if(!this.showConfirmMsg("新增")){
        return; 
      }
     
      this.dataService.createAtr(this.atrVO).
          subscribe((carrier) => {
            
              var msg = carrier.attributeMap["msg"];
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
      if(!this.showConfirmMsg("修改")){
        return;
      }
      this.dataService.updateAtr(this.atrVO).
          subscribe(()=>{
              this.queryAtrList();
          },error=>console.log("error=" + error));
  }

  del(){
      if(!this.showConfirmMsg("刪除")){
        return;
      } 
      this.dataService.deleteAtr(this.atrVO).
          subscribe(()=>{
              this.cleanAndQryAtrList();
          },error=>console.log("error=" + error));; 
  }

  copyToEdit(atrVO:AtrVOIface){      
      //clone Object
      this.atrVO = JSON.parse(JSON.stringify(atrVO));;
  }
}
