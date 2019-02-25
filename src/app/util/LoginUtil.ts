import { LoginUserVO } from '../vo/LoginUserVO';

export class LoginUtil{
    static STORAGE_KEY:string = "JNY_loginUser";
    static STORAGE_CHG_EVENT = "JNY_StorageChgEvent";

    static getLoginUser():LoginUserVO{
        var loginUser:LoginUserVO = JSON.parse(localStorage.getItem(LoginUtil.STORAGE_KEY));
        if(loginUser == null || loginUser==undefined){
            return new LoginUserVO();
        }else{
            return loginUser;
        }

    }
    
    static isLogin(){
        var loginUser = LoginUtil.getLoginUser();
        return loginUser.userId != "";
    }

    static saveToStorage(loginUser:LoginUserVO):void{
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