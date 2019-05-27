import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { DataService } from '../dataExchange/data.service';
import { Carrier } from '../dataExchange/Carrier';
import { Util } from '../util/Util';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent  implements OnInit{
  hero: Hero = {
    id: 1,
    name: '毀滅之鎚'
  };

  ctrlUrl='osjcHeroCtrl/';

  constructor(private dataService:DataService) { 
    
  }

  ngOnInit() {
      
  }

  callServlet(){
    console.log("callServlet");
    
    this.dataService.postFormJsonStr(this.ctrlUrl + "query", this.hero).subscribe((carrier:Carrier)=>{
        alert("msg="+ carrier.attributeMap["msg"]);
        console.log("msg=" + carrier.attributeMap["msg"]);
    },error=>console.log( error));
  }

  //接收完整response
  callServletGetResp(){
    console.log("callServletGetResp");
    this.dataService.postRtnResponse(this.ctrlUrl + "query", this.hero).subscribe((carrier:Carrier)=>{
        //console.log("resp subscribe");
        //console.log("resp.body.attributeMap.msg=" + resp.body.attributeMap.msg);
        console.log("msg=" + carrier.attributeMap["msg"]);
    },error=>console.log( error));
  }

  servletUploadFile(event){
    let fileList: FileList = event.target.files;
    const fileLength = fileList.length;
    const formData: FormData = new FormData();
    
    for (let index = 0; index < fileLength; index++) {
        let singleFile = fileList.item(index);
        formData.append('files', singleFile);
    }
    
    this.dataService.postNoHeader(this.ctrlUrl+"uploadFile", formData).subscribe((carrier:Carrier)=>{
        console.log("msg=" + carrier.attributeMap["msg"]);
    },error=>console.log( error));
  }

  test(){
    var paramAndData = {v1:this.hero, t1:11, t2:"t2 value"};

    //json key值為欄位名
    this.dataService.postJsonSeperateParam(this.ctrlUrl + "test", paramAndData).subscribe((carrier:Carrier) => {
        console.log("msg="+ carrier.attributeMap["msg"]);
    }, error=>console.log(error));
  }
}
