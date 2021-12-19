import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Place } from '../model/place.model';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
//import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private locations: Array<Place>=[];
  private dataBaseObj: SQLiteObject;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public currentLocation: Place;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public tables={
    localisation: 'localisation'
  };
  constructor(private storage: Storage, private sqlite: SQLite) {
  }
 async createDatabase(){
   await this.sqlite.create({
    // eslint-disable-next-line @typescript-eslint/quotes
    name:"MyDataBsase",
    // eslint-disable-next-line @typescript-eslint/quotes
    location: "default"
  }).then((db: SQLiteObject)=>{
    this.dataBaseObj=db;
    alert('Base de donnée crée avec succèss');
  }).catch((e)=>{
    alert('erreur lors de la création de la base de données'+JSON.stringify(e));
  });
  this.createTable();
}
//Creation de la table localisation
 async createTable(){
   await this.dataBaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.localisation} (id INTEGER PRIMARY KEY AUTOINCREMENT, titre VARCHAR(40) NOT NULL,
      city VARCHAR(40) NOT NULL, country VARCHAR(40) NOT NULL, keywords VARCHAR(40) NOT NULL, 
      timest INTEGER, latitude INTEGER, longitude INTEGER, photo VARCHAR(255) )`,[]
   );
 }
 async addLocalisation(place: Place){
   return this.dataBaseObj.executeSql(
     `INSERT INTO ${this.tables.localisation} (titre, city, country, keywords, timest) VALUES ("${place.titre}",
       "${place.city}", "${place.country}", "${place.keywords}", "${place.timestamp}")`,[]
   ).then(()=>{
     console.log('Place Ajoutée Avec Succes');
   }).catch((e)=>{
     if (e.code===6) {
      console.log('Cette Place existe');
     }
    console.log('Erreur d\'insertion de Place '+JSON.stringify(e));
   });
 }
async getLocalisation() {
  return this.dataBaseObj.executeSql(
      `SELECT * FROM ${this.tables.localisation} ORDER BY titre ASC`,[]
  // eslint-disable-next-line arrow-body-style
  ).then((result) =>{
    console.log('données récuperées avec succes '+JSON.stringify(result));
    return result;
  }
  ).catch((e)=>{
    console.log('Erreur de récupération de Places'+JSON.stringify(e));
  });
}
async deleteLocalisation(id: number){
  return this.dataBaseObj.executeSql(
    `DELETE FROM ${this.tables.localisation} WHERE id=${id}`,[]
  ).then(()=>{
    console.log('place deleted');
  }).catch((e)=>{
    console.log('place deleted'+JSON.stringify(e));
  });
}
async updateLocalisation(place: Place){
  return this.dataBaseObj.executeSql(
    `UPDATE   ${this.tables.localisation} SET titre=${place.titre}, city=${place.city}, country=${place.country},
    keywords=${place.keywords} WHERE id=${place.id}`, []
  ).then(()=>{
    console.log('Mise à jour Effectué');
  }).catch((e)=>{
    console.log('erreur de mise à jour '+JSON.stringify(e));
  });
}
async addPhoto(base64Image: string, id: number) {
  return this.dataBaseObj.executeSql(
    `UPDATE  ${this.tables.localisation} SET photo="${base64Image}" WHERE id=${id}`, []
  ).then(()=>{
    console.log('Image sauvegardée');
  }).catch((e)=>{
    console.log('une erreur s\'est produite'+JSON.stringify(e));
  });
  /*for (let index = 0; index < this.locations.length; index++) {
    if (this.locations[index].id===id) {
      this.locations[index].photo.push(base64Image);
      console.log()
      break;
    }

  }*/
}

 /* public getLocation(){
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
  */
}

