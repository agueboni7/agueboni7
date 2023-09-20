import { Injectable } from '@angular/core';
import { Place } from '../model/place.model';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

//import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
 // private locations: Array<Place>=[];
  public currentLocation: Place;
  public tables={
    localisation: 'localisation'
  };
  private dataBaseObj: SQLiteObject;
 
  constructor(private sqlite: SQLite) {
  }
 async createDatabase(){
   await this.sqlite
   .create({
    name:'MyDataBsase',
    location: 'default',
  })
  .then((db:SQLiteObject)=>{
    this.dataBaseObj=db;
    alert('Base de donnée crée avec succèss');
    
  }).catch((e)=>{
    alert('erreur lors de la création de la base de données'+JSON.stringify(e));
  });
  
  await this.createTable();
}
//Creation de la table localisation
 async createTable(){
  await this.dataBaseObj.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tables.localisation} (id INTEGER PRIMARY KEY AUTOINCREMENT, titre VARCHAR(40) NOT NULL,
      city VARCHAR(40) NOT NULL, country VARCHAR(40) NOT NULL, keywords VARCHAR(40) NOT NULL,
      timest INTEGER, latitude INTEGER, longitude INTEGER, photo VARCHAR(255) )`,[])
      .then((r)=>{
     alert('table crée avec succes'+r);
   }).catch((e)=>{
    alert('Echec de création de table '+JSON.stringify(e));
   });
 }
 async addLocalisation(place: Place){
      let sql='INSERT INTO '+this.tables.localisation+' (titre, city, country, keywords, timest) VALUES (?,?,?,?,?)';
     return  this.dataBaseObj.executeSql(
       sql, [place.titre,place.city, place.country, place.keywords,place.timestamp]
        ).then(()=>{
          return alert('location Created');
        }).catch((e)=>{
          return alert('Erreur of location created '+e);
        })
        

   }

  async getLocalisation() {
  let sql="SELECT * FROM "+this.tables.localisation+" ORDER BY titre ASC";
  return  this.dataBaseObj.executeSql(sql, [])
  .then((result)=>{
    return result;
  }).catch((e)=>{
    return alert('error occured of get '+e)
  })
}

async deleteLocalisation(id: number){
  return await this.dataBaseObj.executeSql(
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

  /////////////////////////////
   getData() {

   this.dataBaseObj.transaction(function (tx) {

      let sql="SELECT * FROM "+this.tables.localisation+" ORDER BY titre ASC";

        tx.executeSql(sql, [], function (tx, resultSet) {

            return resultSet;
        },
        function (tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    }
    ), err=>{
      console.log(err);
      
    };

}
}
