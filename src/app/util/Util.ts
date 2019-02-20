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
        //document.cookie = "sdms_userId=SD0060;path=/";
        //document.cookie = "sdms_userName="+ encodeURIComponent("陳炯霖") +";path=/";
        var path = ";path=/";
        document.cookie = name+"="+ encodeURIComponent(value) + path;
    }
}