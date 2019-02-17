import { Component, OnInit } from '@angular/core';
import {AssetTypeVOiface} from '../vo/AssetTypeVOiface';
import { AtrVOiface } from '../vo/AtrVOIface';
import { DataService } from '../dataExchange/data.service';

@Component({
  selector: 'app-asset-type-edit',
  templateUrl: './asset-type-edit.component.html',
  styleUrls: ['./asset-type-edit.component.css']
})
export class AssetTypeEditComponent implements OnInit {
  assetTypeVO:AssetTypeVOiface={};
  atrVOs:AtrVOiface[]=[{}];

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.queryAtrList().subscribe((artVOArray:AtrVOiface[])=>{
            this.atrVOs=artVOArray;
        },error => console.log("error=" + error));;
  }

}
