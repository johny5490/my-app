export class VendorScheduleVO{
    vendorId?:string;
    vendorId_org?:string;
    vendorName?:string;
    //yyyymmdd格式的訂購日
    orderDate?:string;
    orderDate_org?:string;
    orderInterval?:string;
    orderInterval_org?:string;
    //mmss 截止時間
    deadline?:string;
    checkBox?:string;
    createUser?:string;
    createUserName?:string;
    createDate?:string;
    updateUser?:string;
    updateUserName?:string;
    updateDate?:string;
    
    //mm:ss 截止時間
    set deadline_t(deadline_t){
        this.deadline = deadline_t.replace(":","");        
    }
    
    get deadline_t(){
        if(this.deadline ==undefined || this.deadline==null || this.deadline==""){
            return "";
        }
        return this.deadline.substring(0,2) + ":" + this.deadline.substring(2);
        
    }

    set orderDate_t(orderDate_t){
        this.orderDate = orderDate_t.replace("/", "").replace("/","");
        
    }

    get orderDate_t(){
        if(this.orderDate ==undefined || this.orderDate==null || this.orderDate==""){
            return "";
        }
        return this.orderDate.substring(0,4) + "/" + this.orderDate.substring(4,6) + "/" + this.orderDate.substring(6);
         
    }
}