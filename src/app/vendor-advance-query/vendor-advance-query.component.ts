import { Component, OnInit, ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { VendorVO } from '../vo/VendorVO';
import { PaginatorComponent } from '../module/shared-module/cpt/paginator/paginator.component';
import { DataService } from '../dataExchange/data.service';

interface compareOption {
  name: string;
  code: string;
}

@Component({
  selector: 'app-vendor-advance-query',
  templateUrl: './vendor-advance-query.component.html',
  styleUrls: ['./vendor-advance-query.component.css']
})
export class VendorAdvanceQueryComponent implements OnInit {
  
  vendorVO_qry:VendorVO = new VendorVO();

  private static COMPARE_EQUAL = "e";
  private static COMPARE_CONTAIN = "c";

  //查詢比對的下拉選單清單
  compareOptions:compareOption[];
  
  //紀錄廠商名稱的查詢比對選擇結果
  compareVendorName:compareOption;
  comparePhone:compareOption;
  compareAddress:compareOption;
  compareRemark:compareOption;

  msg="歡迎";
  //後端提供給分頁元件所使用的SQL
  dataSource = "com.sdms.oa.dataSource.oajcVendorPaginatorDataSource";

  //廠商資料
  mapArray:Array<any>=[];

  //切換摺頁，第一個為0依此類推
  activeTabIndex:number=0;

  //進階查詢是否顯示
  @Input() visible:boolean;
  @Output() visibleChange = new EventEmitter();

  @ViewChild('paginator') paginator: PaginatorComponent;

  constructor(private dataService:DataService) { 
    this.compareOptions = [{name: '等於', code: VendorAdvanceQueryComponent.COMPARE_EQUAL},
                           {name: '包含', code: VendorAdvanceQueryComponent.COMPARE_CONTAIN}];
    this.compareVendorName = this.compareOptions[0];

  }

  ngOnInit() {
  }

  cancel(){
    this.visible=false;
    this.visibleChange.emit(this.visible);
  }

  queryVendor(map){
    var event = {"name" : "queryVendor", "value":map["VENDORID"]};
    this.dataService.eventBus.emit(event);

  }

  //廠商進階查詢
  vendorAdvanceQuery(){
    console.log("this.compareVendorName=" + this.compareVendorName);
    var data ={vendorVO_qry:this.vendorVO_qry , compareVendorName:this.compareVendorName.code};
    this.paginator.doQuery(data);
  }

  onAfterQuery(event){
    
    this.msg = event["msg"];
    this.mapArray = event["data"];
    //切換到查詢結果摺頁
    this.activeTabIndex = 1;
  }
 
}
