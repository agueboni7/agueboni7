import { LocationsService } from './../services/locations.service';
import { Place } from './../model/place.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  public locations: Array<Place>;
  constructor(
    private router: Router,
     private serLocation: LocationsService,
     private alertCtrl: AlertController
     ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.getAllPlaces();
  }

  getAllPlaces(){
    this.serLocation.getLocation().then((value)=>{
    this.locations=value;
    console.log(this.locations);
});
  }
  onNewLocation(){
   this.router.navigateByUrl('menu/newlocation');
  }

 async onRemove(place: Place){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation !',
      message: 'Etes-vous sûre de <strong>vouloir supprimer cette place</strong> ?',
      buttons: [
        {
          text: 'NON',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OUI',
          cssClass: 'danger',
          handler: () => {
            this.removePlce(place);
          }
        }
      ]
    });
    await alert.present();
   }
  removePlce(place: Place) {
      const index= this.locations.indexOf(place);
      this.locations.splice(index, 1);
      this.serLocation.updateLocation(this.locations);
  }

  onDeteilLocation(place: Place){
    this.serLocation.currentLocation=place;
    this.router.navigate(['/menu/location-detail']);
  }
}
