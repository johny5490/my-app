import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {DataService} from '../../../../dataExchange/data.service';

@Component({
  selector: 'app-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.css']
})
export class UserPickerComponent implements OnInit {
  
  _show=false;


  @Input()
  set show(show){
    //console.log("show call");
    this._show=show==0?false:true;
  }

  @Output() pick =new EventEmitter();

  constructor(private dataService:DataService) { }

  ngOnInit() {
    //setInterval(()=>{console.log("visible=" + this.visible )}, 3000);
  }

  confirmOK(){
    var pickedUser = {userId:"A123",userName:"姓名"};
    this.pick.emit(pickedUser);

    this._show=false;
  }
  cancel(){
    this._show=false;
  }
}
