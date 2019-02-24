import { LoginUser } from '../vo/LoginUser';

export class LoginUtil{
    static STORAGE_KEY:string = "JNY_loginUser";
    static STORAGE_CHG_EVENT = "JNY_StorageChgEvent";

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
        LoginUtil.dispatchEvent();
    }

    static removeFromStorage():void{
        localStorage.removeItem(LoginUtil.STORAGE_KEY);
        LoginUtil.dispatchEvent();
    }
    
    private static dispatchEvent(){
        var StorageChgEvent = new Event(LoginUtil.STORAGE_CHG_EVENT);
        window.dispatchEvent(StorageChgEvent);
    }
}