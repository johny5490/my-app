import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {} from 'rxjs/add/operator/toPromise';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ajaxPost } from 'rxjs/internal/observable/dom/AjaxObservable';
import { EmpVO } from '../vo/EmpVO';
import { HeroesComponent } from '../heroes/heroes.component';
import { Routes } from '@angular/router';
import { AtrVOiface } from '../vo/AtrVOiface';
import { Carrier } from './Carrier';
import { LoginUtil } from '../util/LoginUtil';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  

  static API_SERVER_CONTEXT = "/OA";
  
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
    /*
    console.log("protocol=" + window.location.protocol + "," +
                "host=" + window.location.host +","+ "" + 
                "pathname=" + window.location.pathname);
    */
    var url = window.location.protocol + "//" + 
              this.removePort(window.location.host) + 
              DataService.API_SERVER_CONTEXT ;
    
    //console.log("url=" + url);
    return url;
  }

  removePort(host: string){
    var idx: number = host.indexOf(":");
    return idx>0 ? host.substring(0, idx) : host;    
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

  getInitRouts(){
    
    var rout:Routes =  [
      { path: 'heroes', component: HeroesComponent },
    ];
    return rout;
    
 
  }

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

  //純字串使用轉JASON會被加上雙引號
  postJson(url:string, data?:any){
    return this.http.post(this.getUrl() + url, JSON.stringify(data), this.genHttpOptions());
  }

  postString(url:string, data?:any){
    return this.http.post(this.getUrl() + url, data, this.genHttpOptions());
  }
}
