import { LocationsService } from './../services/locations.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Place } from '../model/place.model';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
})
export class LocationDetailPage implements OnInit {
  public currentPlace: Place;
  constructor(
    private serLoc: LocationsService,
    private camera: Camera,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.currentPlace=this.serLoc.currentLocation;
  }

  async  onClick(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true
    };
    const options1: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true
    };
    const alert= await this.alertCtrl.create({
      cssClass: 'secondary',
      header:'Confirmation',
      message: 'Source ?',
      buttons:[
        {
          text: 'Camera',
          cssClass: 'primary',
          handler:()=>{
            this.getPicture(options);
          }
      },{
        text: 'Librairie',
        cssClass: 'primary',
        handler: ()=>{
          this.getPicture(options1);
        }
      }
      ]
    });
    await alert.present();
    /*this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     const base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     console.log(err);
    });*/
  }
  getPicture(op: CameraOptions) {
    this.camera.getPicture(op).then((imageData)=>{
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      //sthis.currentPlace.photo.push(base64Image);
      this.serLoc.addPhoto(base64Image, this.currentPlace.timestamp);
    });
  }
}
