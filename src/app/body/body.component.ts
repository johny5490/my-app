import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
    userName = "安琪拉";
    deptName = "財會";
    txtVal = "123";
    towWayBingTxt = "666";
    dialogShow = false;

    constructor(private dataService: DataService) { }

    ngOnInit() {
    }

    showValue(){
        alert("txtVal=" + this.txtVal);
    }

    iconClick(){
        this.dialogShow=true;
    }
    
  updateHero(){
    this.dataService.updateHero();
  }

  userSelectPop(){
    window.open('', '');
  }
}
