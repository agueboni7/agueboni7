import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNewLocation(){
   this.router.navigateByUrl('menu/newlocation');
  }
}
