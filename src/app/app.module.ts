import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      // eslint-disable-next-line no-underscore-dangle
      name:'MydataBase', driverOrder:[Drivers.IndexedDB, CordovaSQLiteDriver._driver]
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWXoDEElBIheBO42_O0zCEd2I7YatBWjk'
    })
    ],
  providers: [Geolocation, Camera, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
