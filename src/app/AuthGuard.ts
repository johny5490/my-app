import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {LoginUtil} from './util/LoginUtil';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if (LoginUtil.isLogin()) {
            return true;
        }
        
        // 未登入轉導登入頁並給定reqUrl做為登入後的轉導頁
        //this.router.navigate(["/login", { outlets: { loginOutlet: null } }], { queryParams: { reqUrl: state.url } });
        
        this.router.navigate(["/login"], {queryParams: { reqUrl: state.url } });
        
        return false;
    }
}