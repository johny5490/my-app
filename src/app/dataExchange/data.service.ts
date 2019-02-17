import { Injectable } from '@angular/core';
import { UserToken } from '../userToken';
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

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private userToken = new UserToken();
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8'})
  };

  constructor(private http: HttpClient) { 
    
  }

  getUrl(){
    /*
    console.log("protocol=" + window.location.protocol + "," +
                "host=" + window.location.host +","+ "" + 
                "pathname=" + window.location.pathname);
    */
    var url = window.location.protocol + "//" + 
              this.removePort(window.location.host) + 
            this.getConetxtRoot(window.location.pathname) ;
    //console.log("url=" + url);

    return url;
  }

  removePort(host: string){
    var idx: number = host.indexOf(":");
    return idx>0 ? host.substring(0, idx) : host;    
  }

  getConetxtRoot(pathname: string){
    var idx:number = pathname.indexOf("/", 1);
    return idx>0 ? pathname.substring(0, idx):"/";
  }

  getUserToken(): UserToken{
    
    this.userToken.setId("u123");
    this.userToken.setName("泰坦之力");
    return this.userToken;
  }

  updateHero () {
 
    var data = {'compId':'sdms','empNo':'u571'};
    /*
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8'})
    };
  */
    return this.http.post<EmpVO>(this.getUrl() + '/Hello/createObj.do', data, this.httpOptions).
                     subscribe(empVO => {
                         console.info("empVO.chiName=" + empVO.chiName + ",empVO.empNo=" + empVO.empNo);
                     }, error => console.log("error=" + error));
  }

  qryEmpList(){
    
    return this.http.post<EmpVO[]>(this.getUrl() +'/EmpCtrl/qryEmpList.do', this.httpOptions).
                                    pipe(
                                           tap(_ => console.log('qryEmpList')),
                                            catchError(this.handleError('qryEmpList', []))
                                    );  
    
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
    /*
    return this.http.post<Carrier>(this.getUrl() +'/AtrCtrl/create.do', atrVO, this.httpOptions).
                 pipe(
                        tap(_ => console.log('createAtr')),
                         catchError(this.handleError('createAtr', []))
                   );
                   */

                
    return this.http.post<Carrier>(this.getUrl() +'/AtrCtrl/create.do', JSON.stringify(atrVO), this.httpOptions)           
  }

  queryAtrList(){    
    return this.http.post(this.getUrl() +'/AtrCtrl/queryAtrList.do', this.httpOptions);
  }

  deleteAtr(atrVO:AtrVOiface){
    return this.http.post(this.getUrl() +'/AtrCtrl/delete.do',JSON.stringify(atrVO), this.httpOptions);
  }

  updateAtr(atrVO:AtrVOiface){
    return this.http.post(this.getUrl() +'/AtrCtrl/update.do',JSON.stringify(atrVO), this.httpOptions);
  }
}
