import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sample-header',
  templateUrl: './sampleHeader.component.html',
  styleUrls: ['./sampleHeader.component.css']
})
export class SampleHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  menuClick(index: string){
    console.log(index);
    if(index == "1"){
        //回首頁
        window.location.href="/";
    }else if(index == "2-1"){
        this.router.navigate(['/heroes']);
    }else if(index == "2-2"){
        this.router.navigate(['/sample/body']);
    } 
    
  }
}
