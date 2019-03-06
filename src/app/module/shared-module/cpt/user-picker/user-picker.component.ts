import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {DataService} from '../../../../dataExchange/data.service';

@Component({
  selector: 'app-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.css']
})
export class UserPickerComponent implements OnInit {
  
  @Input() visible:boolean;
  @Output() visibleChange =new EventEmitter();
  
  @Output() pick = new EventEmitter();
  @Output() noPick = new EventEmitter();

  constructor(private dataService:DataService) {
    /*
    dataService.eventbus.subscribe(event=>{
        if(event.type ==3){
            console.log("接收event 3");
            this.visible=true;
        }
    });
    */

   }

  ngOnInit() {
    
  }

  confirmOK(){
    this.visible=false;
  }

  cancel(){
    this.visible=false;
  }

  onHide(){
    //有選擇資料時觸發pick沒有則是noPick
    var pickedUser = {userId:"A123",userName:"姓名"};
    this.pick.emit(pickedUser);
    this.noPick.emit();
    
    this.visibleChange.emit(this.visible);
  }
}
