import { PlacesModel } from './../model/places-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locations: Array<PlacesModel>=[];
  constructor(private storage: Storage) { }
  public getLocation(){
    return this.locations;
  }
  public addLoctions(place: PlacesModel){
    return this.locations.push(place);
  }
}
