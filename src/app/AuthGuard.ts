import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {LoginUtil} from './util/LoginUtil';
import { DataService } from './dataExchange/data.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private dataService:DataService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if (LoginUtil.isLogin()) {
            return true;
        }
        
        // 未登入轉導登入頁並給定reqUrl做為登入後的轉導頁
        //this.router.navigate(["/login", { outlets: { loginOutlet: null } }], { queryParams: { reqUrl: state.url } });
        
        //Angular版的登入頁面
        //this.router.navigate(["/login"], {queryParams: { reqUrl: state.url } });
        LoginUtil.relogin(this.dataService);
        return false;
    }
}