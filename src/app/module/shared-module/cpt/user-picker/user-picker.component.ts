import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {DataService} from '../../../../dataExchange/data.service';


@Component({
  selector: 'app-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.css']
})
export class UserPickerComponent implements OnInit {
  
  //@Input() visible:boolean;
  //@Output() visibleChange = new EventEmitter();

  visible:boolean;

  @Input() value:string;
  @Output() valueChange = new EventEmitter();

  //@Output() pick = new EventEmitter();
  //@Output() noPick = new EventEmitter();

  selectValue:string;

  constructor(private dataService:DataService) {

   }

  ngOnInit() {
    
  }

  pick(){
    this.visible=false;
    this.value=this.selectValue;
    this.valueChange.emit(this.value);
  }


  /*
  onHide(){
    //有選擇資料時觸發pick沒有則是noPick
    var pickedUser = {userId:"A123",userName:"姓名"};
    this.pick.emit(pickedUser);
    this.noPick.emit();
    
    this.visibleChange.emit(this.visible);
    this.valueChange.emit(this.value);
  }
  */
  showUserPicker(){
    this.visible = true;
  }
}
