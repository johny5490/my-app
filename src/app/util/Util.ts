import { Router } from '@angular/router';

export class Util{

    static showConfirmMsg(act:string):boolean{
        return window.confirm("確定要"+act+"?");
    }

    static getCookieValue(cookieName:string){
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          //去掉前空格
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    static setCookie(name: string, value: string){
        
        var path = ";path=/";
        document.cookie = name+"="+ encodeURIComponent(value) + path;
    }

    /*routerLink在重複點擊時不會刷新畫面，故先連結一個不存在頁面再轉來達到刷新效果，
    * 比使用onSameUrlNavigation要簡單的多
    */
    static routerLinkReload(router:Router, url:string){
      router.navigateByUrl('', {skipLocationChange: true}).
                  then(()=>
                       router.navigate([url]));
    }
}