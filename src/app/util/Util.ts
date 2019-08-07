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

    /*routerLink在重複點擊時不會刷新畫面，故先連結一個不存在頁面再轉，來達到刷新效果，
    * 比使用onSameUrlNavigation要簡單的多
    */
    static routerLinkReload(router:Router, url:string){
      router.navigateByUrl('', {skipLocationChange: true}).
                  then(()=>
                       router.navigate([url]));
    }

    static hasValue(val){
        if(val != undefined && val != null && val!=""){
          return true;
        }
        return false;
    }

    /*
    * 取得目前url不指定port
    */
   static getUrlNoPort(){
    /*
    console.log("protocol=" + window.location.protocol + "," +
                "host=" + window.location.host +","+ "" + 
                "pathname=" + window.location.pathname);
    */
    var url = window.location.protocol + "//" + 
              Util.removePort(window.location.host) ;
    //console.log("url=" + url);
    return url;
  }

   private static removePort(host: string){
    var idx: number = host.indexOf(":");
    return idx>0 ? host.substring(0, idx) : host;    
  }

  static getCalendarLocale(){
    //gitHub上有Bug 回報，dataFormat官網文件有寫到但卻沒有用
    return {
      firstDayOfWeek: 0,
      dayNames: ["週日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dayNamesShort: ["週日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dayNamesMin: ["週日", "周一", "周二", "周三", "周四", "周五", "周六"],
      monthNames: [ "一月", "二月", "三月", "四月", "五月", "六月","七月", "八月", "九月", "十月", "十一月", "十二月" ],
      monthNamesShort: [ "一月", "二月", "三月", "四月", "五月", "六月","七月", "八月", "九月", "十月", "十一月", "十二月" ],
      today: '今天',
      clear: '清除',
      //dateFormat: 'yy/mm/dd',
      weekHeader: 'Wk'
    };
    
  }

  //yyyymmdd轉成yyyy/mm/dd
  static toSlashDate(date:string){
    if(date==null || date==undefined || date==""){
        return "";
    }
    return date.substring(0,4) + "/" + date.substring(4,6)+"/"+date.substring(6);
  }
}