import { LocationsService } from './../services/locations.service';
import { Place } from './../model/place.model';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertController, NavController } from '@ionic/angular/';


@Component({
  selector: 'app-newlocation',
  templateUrl: './newlocation.page.html',
  styleUrls: ['./newlocation.page.scss'],
})
export class NewlocationPage implements OnInit {
  public currentPlace: Place;
  constructor(
    private servLoc: LocationsService,
     private geolocation: Geolocation,
    private navCtrl: NavController,
    private alertCtrl: AlertController
     ) { }
  ngOnInit() {
  }

  //formulare get
  public onAddLocation(data: Place){
    data.timestamp=new Date().getTime();
    data.photo=[];
    this.servLoc.addLocalisation(data).then((result)=>{
      console.log(data);
    });
    /*this.geolocation.getCurrentPosition().then((result)=>{
      data.coordonates={
        longitude:result.coords.longitude,
        latitude:result.coords.latitude
    };
      console.log(data);
      this.servLoc.addLoctions(data);
    });*/
   // this.servLoc.addLoctions(data);
    this.navCtrl.back();
  }

}
