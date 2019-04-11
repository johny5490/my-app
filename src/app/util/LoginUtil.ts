import { LoginUserVO } from '../vo/LoginUserVO';

export class LoginUtil{
    static STORAGE_KEY:string = "JNY_loginUser";
    static STORAGE_CHG_EVENT = "JNY_StorageChgEvent";

    static getLoginUser():LoginUserVO{
        var loginUserVO:LoginUserVO = JSON.parse(localStorage.getItem(LoginUtil.STORAGE_KEY));
        if(loginUserVO == null || loginUserVO==undefined){
            return new LoginUserVO();
        }else{
            return loginUserVO;
        }

    }
    
    static isLogin(){
        var loginUser = LoginUtil.getLoginUser();
        return loginUser.userId != "";
    }

    static saveToStorage(loginUserVO:LoginUserVO):void{
        localStorage.setItem(LoginUtil.STORAGE_KEY, JSON.stringify(loginUserVO));
        LoginUtil.dispatchEvent();
    }

    static removeFromStorage():void{
        localStorage.removeItem(LoginUtil.STORAGE_KEY);
        LoginUtil.dispatchEvent();
    }
    
    private static dispatchEvent(){
        //IE不支援Event建構子
        //var StorageChgEvent = new Event(LoginUtil.STORAGE_CHG_EVENT);
        
        var StorageChgEvent = document.createEvent('Event');
        // 設定事件名稱
        StorageChgEvent.initEvent(LoginUtil.STORAGE_CHG_EVENT, true, true);
        window.dispatchEvent(StorageChgEvent);
        
    }

    static cloneAndEncode(loginUserVO:LoginUserVO){
        var clonedVO:LoginUserVO = JSON.parse(JSON.stringify(loginUserVO));
        clonedVO.userName = encodeURIComponent(clonedVO.userName);
        clonedVO.postName = encodeURIComponent(clonedVO.postName);
        clonedVO.deptName=encodeURIComponent(clonedVO.deptName);
        return JSON.stringify(clonedVO);
    }
}