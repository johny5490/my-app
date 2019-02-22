import { LoginUser } from '../vo/LoginUser';

export class LoginUtil{
    static STORAGE_KEY:string = "loginUser";

    static getLoginUser():LoginUser{
        var loginUser:LoginUser = JSON.parse(localStorage.getItem(LoginUtil.STORAGE_KEY));
        if(loginUser == null || loginUser==undefined){
            return new LoginUser();
        }else{
            return loginUser;
        }

    }
    
    static isLogin(){
        var loginUser = LoginUtil.getLoginUser();
        return loginUser.userId != "";
    }

    static saveToStorage(loginUser:LoginUser):void{
        localStorage.setItem(LoginUtil.STORAGE_KEY, JSON.stringify(loginUser));
    }

    static removeFromStorage():void{
        localStorage.removeItem(LoginUtil.STORAGE_KEY);
    }
}