import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
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
  menuItems: MenuItem[];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.userToken = this.dataService.getUserToken();
    this.menuItems = [
      {
          label: 'File',
          items: [{
                  label: 'New', 
                  icon: 'pi pi-fw pi-plus',
                  items: [
                      {label: 'Project'},
                      {label: 'Other'},
                  ]
              },
              {label: 'Open'},
              {label: 'Quit'}
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      }
     ];

  }

  getMenuItems(){
    return this.menuItems;
  }
}
