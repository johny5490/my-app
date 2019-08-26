import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams, HttpResponse } from '@angular/common/http';

import {} from 'rxjs/add/operator/toPromise';
import {catchError, map, tap, filter} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ajaxPost } from 'rxjs/internal/observable/dom/AjaxObservable';
import { EmpVO } from '../vo/EmpVO';
import { Routes } from '@angular/router';
import { AtrVOiface } from '../vo/AtrVOiface';
import { Carrier } from './Carrier';
import { LoginUtil } from '../util/LoginUtil';
import { Util } from '../util/Util';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public eventBus: EventEmitter<any> = new EventEmitter<any>();

  static API_SERVLET_URL = "/erp/os/api/";
  
  constructor(private http: HttpClient) { 
    
  }
  
  private genHttpOptions(){
    var httpOptions = {headers:this.genHeaders()};
    return httpOptions;
  }

  private genHeaders(){
    var loginUserVO = LoginUtil.getLoginUser();
    
    return new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8', 
                              'JNY-loginUserVO':LoginUtil.cloneAndEncode(loginUserVO),
                            });
  }

  getUrl(){
    return Util.getUrlNoPort() + DataService.API_SERVLET_URL;
  }



  /*
  getContextRoot(pathname: string){
    var idx:number = pathname.indexOf("/", 1);
    return idx>0 ? pathname.substring(0, idx):"/";
  }
  */

  updateHero () {
 
    var data = {'compId':'sdms','empNo':'u571'};
    /*
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8'})
    };
  */
    return this.http.post<EmpVO>(this.getUrl() + '/Hello/createObj.do', data, this.genHttpOptions()).
                     subscribe(empVO => {
                         console.info("empVO.chiName=" + empVO.chiName + ",empVO.empNo=" + empVO.empNo);
                     }, error => console.log("error=" + error));
  }
  /*
  getInitRouts(){
    
    var rout:Routes =  [
      { path: 'heroes', component: HeroesComponent },
    ];
    return rout;
    
  }
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  createAtr(atrVO:AtrVOiface){        
    return this.http.post(this.getUrl() +'/api/AtrCtrl/create.do', JSON.stringify(atrVO), this.genHttpOptions())           
  }



  deleteAtr(atrVO:AtrVOiface){
    return this.http.post<Carrier>(this.getUrl() +'/api/AtrCtrl/delete.do',JSON.stringify(atrVO), this.genHttpOptions());
  }

  updateAtr(atrVO:AtrVOiface){
    return this.http.post<Carrier>(this.getUrl() +'/api/AtrCtrl/update.do',JSON.stringify(atrVO), this.genHttpOptions());
  }
  /*
  postJsonRespBlob(url:string, data?:any){
    var httpOptions = { headers:this.genHeaders() };
    httpOptions["responseType"]="blob";
    return this.http.post(this.getUrl() + url, JSON.stringify(data), httpOptions);
  }
  */
  //測試用，資料放在data欄位
  postFormJsonStr(url:string, data?:any){
    // set不能拆開寫但可以一直接續,有一說因HttpParams是immutable
    
    var body = new HttpParams().set('data', JSON.stringify(data));
    
    return this.http.post(this.getUrl() + url, body,{
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
     });
  
  }

  postNoHeader(url:string, data?:any){
    //上傳檔案不能指定header
    //return this.http.post(this.getUrl() + url, data);
    return this.http.post(this.getUrl() + url, data, {
      //headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      observe: 'response',
      withCredentials:true,
      
      }).pipe(
        filter( resp=>{
          return this.verifyLogin(resp);
        }),
        map( resp =>{
            return resp.body;
        })
     );
  }

  
  //傳物件，但純字串若使用轉JASON會被加上雙引號
  postJsonDefaultParam(url:string, data?:any){
    //return this.http.post(this.getUrl() + url, JSON.stringify(data), this.genHttpOptions());
     // set不能拆開寫但可以一直接續,有一說因HttpParams是immutable
    var body = new HttpParams().set('data', JSON.stringify(data));

    return this.http.post(this.getUrl() + url, body,{
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
          observe: 'response',
          withCredentials:true,
          
     }).pipe(
        filter( resp=>{
          return this.verifyLogin(resp);
        }),
        map( resp =>{
            return resp.body;
        })
     );    
  }
  
  verifyLogin(resp){
    var loginUserJson = resp.headers.get('JNY-loginUserVO');
    //console.log("loginUserJson=" + loginUserJson);
    if(loginUserJson==null || loginUserJson==undefined || loginUserJson==''){
        // 沒有認證資訊轉中冠重新登入頁
        LoginUtil.relogin(this);
        return false;
    }
    LoginUtil.saveToStorage(JSON.parse(decodeURIComponent(loginUserJson)));

    //server系統時間
    var systime = resp.headers.get('JNY-systime');

    //console.log("systime=" + systime); 

    if(systime!=null && systime!=undefined && systime!=''){
      var event={name:"systime", value:systime};  
      this.eventBus.emit(event);
    }
    return true;
  }

  //將paramAndData中的key做為http參數的key值
  postJsonSeperateParam(url:string,paramAndData?:any){
    
     var params={};
    
     Object.entries(paramAndData).forEach(([key, value]) => {
        //console.log(key + ' - ' + value); 
        params[key] = JSON.stringify(value);
      });

     var body = new HttpParams({fromObject:params});

    return this.http.post(this.getUrl() + url, body,{
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
          observe: 'response',
          withCredentials:true,
          
     }).pipe(
        filter( resp=>{
          return this.verifyLogin(resp);
        }),
        map( resp =>{
            return resp.body;
        })
     );    
  }

  postJsonRespBlob(url:string, data?:any){
     // set不能拆開寫但可以一直接續,有一說因HttpParams是immutable
    var body = new HttpParams().set('data', JSON.stringify(data));

    return this.http.post(this.getUrl() + url, body,{
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
          observe: 'response',
          withCredentials:true,
          responseType:'blob'
     }).pipe(
        filter( resp=>{
          var loginUserJson = resp.headers.get('JNY-loginUserVO');
          if(loginUserJson==null || loginUserJson==undefined || loginUserJson==''){
              // 沒有認證資訊轉中冠重新登入頁
              LoginUtil.relogin(this);
              return false;
          }
          LoginUtil.saveToStorage(JSON.parse(decodeURIComponent(loginUserJson)));
          return true;
        }),
        map( resp =>{
            return resp.body;
        })
     );    
  }

  //純字串使用
  postString(url:string, data?:any){
    return this.http.post(this.getUrl() + url, data, this.genHttpOptions());
  }

  postRtnResponse(url:string, data?:any){
    // set不能拆開寫但可以一直接續,有一說因HttpParams是immutable
    var body = new HttpParams().set('data', JSON.stringify(data));
    /*
    return this.http.post(this.getUrl() + url, body,{
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
          observe: 'response',
          withCredentials:true
     }).pipe(
        tap(resp=>{
          console.log("resp.headers Content-Type=" + resp.headers.get('Content-Type'));
          var loginUser = resp.headers.get('JNY-loginUserVO');
          console.log("resp.headers JNY-loginUserVO=" + decodeURIComponent(loginUser));          
          console.log("resp.body=" + resp.body);
        })
        
     );
          */
    return this.http.post(this.getUrl() + url, body,{
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
          observe: 'response',
          withCredentials:true
     }).pipe(
        filter( resp=>{
          /*
          console.log("resp.headers Content-Type=" + resp.headers.get('Content-Type'));
          console.log("resp.headers JNY-loginUserVO=" + decodeURIComponent(loginUserJson));          
          console.log("resp.body=" + resp.body);
          */
          var loginUserJson = resp.headers.get('JNY-loginUserVO');
          if(loginUserJson==null || loginUserJson==undefined || loginUserJson==''){
              // 沒有認證資訊轉中冠重新登入頁
              LoginUtil.relogin(this);
              return false;
          }
          LoginUtil.saveToStorage(JSON.parse(decodeURIComponent(loginUserJson)));
          return true;
        }),
        map( resp =>{
            return resp.body;
        })
     );     
  }


}
