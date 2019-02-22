import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /*
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        */
        // not logged in so redirect to login page with the reqUrl url
        //this.router.navigate(["/login", { outlets: { loginOutlet: null } }], { queryParams: { reqUrl: state.url } });
        console.log("canActivate run");
        //this.router.navigate([{ outlets: { loginOutlet: null }}]);
        return false;
    }
}