import { Place } from './../model/place.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newlocation',
  templateUrl: './newlocation.page.html',
  styleUrls: ['./newlocation.page.scss'],
})
export class NewlocationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //formulare get
  public onAddLocation(data:Place){
    data.timestamp=new Date().getTime()
    console.log(data);
  }
}
