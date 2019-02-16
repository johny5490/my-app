import { Component, OnInit } from '@angular/core';
import { DataService} from '../dataExchange/data.service';
import { UserToken } from '../userToken';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userToken: UserToken;


  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.userToken = this.dataService.getUserToken();
    

  }


}
