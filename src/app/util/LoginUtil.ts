import { LoginUserVO } from '../vo/LoginUserVO';
import { DataService } from '../dataExchange/data.service';

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

    static relogin(dataService:DataService){
        var x = screen.availWidth / 3;
        var y = screen.availHeight / 3;
        var para = "top=" + y + ", left=" + x + ", height=200, width=380";
        //此段邏輯參考中冠程式dejtmf.jss relogin function

        var samllPara = "top=" + y + ", left=" + x + ", height=1, width=1";
        var tempWin = window.open('', 'OATemp', samllPara);
        var loginWin = tempWin.open('http://' + window.location.hostname + '/erp/ds/jsp/dsjjsn2.jsp', 'LOGINWIN', para);
        //在Chrome且雙螢幕時會發生錯誤
        //loginWin.moveTo(screen.availWidth / 3, screen.availHeight / 3);
        
        
        var loop = setInterval(function() {
            
            if(loginWin.closed) {                
                clearInterval(loop);
                tempWin.close();
                dataService.postJsonDefaultParam("osjcLoginCtrl/doNothing").subscribe(()=>{},error=>console.log(error));
            }  
        }, 1000);
        
    }

    
}