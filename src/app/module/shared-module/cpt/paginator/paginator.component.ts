import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { DataService } from '../../../../dataExchange/data.service';
import {Carrier} from '../../../../dataExchange/carrier';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  ctrlUrl = "osjcPaginatorCtrl/";

  @Input() dataSource:string="";

  //查詢條件
  conditionObj:any = "";

  @Output() onAfterQuery = new EventEmitter();

  //總筆數
  totalRecords:number=0;
  //每頁幾筆，暫時固定不提供可變更
  rowsPerPage:number=10;
  
  firstRowIndex:number;

  @ViewChild('paginator') paginator: Paginator;

  constructor(private dataService:DataService) { }

  ngOnInit() {

  }

  //提供外部呼叫，傳入查詢條件，完成查詢後發出onAfterQuery事件
  doQuery(conditionObj:any){
    //console.log("dataSource=" + this.dataSource);
    this.conditionObj = conditionObj;
    /*
    var data = {"conditionObj":this.conditionObj, "dataSource":this.dataSource, 
                "rowsPerPage":this.rowsPerPage, "pageIndex":0};
    */
    this.doPost("query", this.genData(0));
  }

  private genData(pageIndex:number){
    var data = {"conditionObj":this.conditionObj, "dataSource":this.dataSource, 
                "rowsPerPage":this.rowsPerPage, "pageIndex":pageIndex};
    return data;
  }

  //點擊分頁觸發查詢
  private queryByPage(event){
    //console.log("queryByPage");
    //this.query(event.page);
    
    this.doPost("query", this.genData(event.page));
  }

  private doPost(ctrlMethod:string, data:any){
    
    this.dataService.postJsonSeperateParam(this.ctrlUrl + ctrlMethod, data).subscribe((carrier:Carrier)=>{
      //this.msg = carrier.attributeMap["msg"];
      var paginatorData = {"msg" : carrier.attributeMap["msg"],"data": carrier.attributeMap["mapArrayData"]};
      
      this.totalRecords = carrier.attributeMap["totalRecords"];
      this.changePage(data["pageIndex"]);
      this.onAfterQuery.emit(paginatorData);
      /*
      if(carrier.attributeMap[respVOkey] != undefined && carrier.attributeMap[respVOkey]!=null){
        
      }
      */
    }, error=>{this.handleError(error)});
  }

  //變更頁碼但不發出事件，此function參考paginator changePage的souce code
  changePage(p :number) {
    this.firstRowIndex = this.paginator.rows * p;
    this.paginator.updatePageLinks();
    this.paginator.updatePaginatorState();
  }

  private handleError(error){
    //this.msg = "系統發生異常";
    console.log( error);
  }
}
