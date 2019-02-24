import { Component, OnInit } from '@angular/core';
import {AssetVO} from '../vo/AssetVO';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {
  ctrlUrl = "/api/AseetCtrl";
  msg:string='歡迎';
  assetVO:AssetVO = {};
  constructor() { }

  ngOnInit() {
    
  }

}
