import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Place } from '../model/place.model';
//import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private locations: Array<Place>=[];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public currentLocation: Place;
  constructor(private storage: Storage) {
   this.init();
   //this.locations.push({title:'Aboubacar'},{title:'TASSO'},{title:'Consolitated@'});
  }
 async init() {
    // If using, define drivers here:
  //  await this.storage.defineDriver(CordovaSQLiteDriver);
  await this.storage.create();
    //this.storage = storage;
  }

  public getLocation(){
    return this.storage.get('location')
    .then(data=>{
      this.locations=data != null ? data:[];
      return this.locations.slice();
    });
  }
  public addLoctions(place: Place){
    this.locations.push(place);
    this.storage.set('location', this.locations);
  }
  updateLocation(location) {
    this.storage.set('location', location);
  }

  addPhoto(base64Image: string, timestamp: number) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index = 0; index < this.locations.length; index++) {
      if (this.locations[index].timestamp===timestamp) {
        this.locations[index].photo.push(base64Image);
        this.updateLocation(this.locations);
        break;
      }

    }
  }
}
