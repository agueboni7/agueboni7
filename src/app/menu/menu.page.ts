import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public menus= [
    {title:'Home', url:'/menu/home', icon:'home'},
    {title:'Meteo', url:'/menu/meteo', icon:'snow'},
    {title:'Gallery', url:'/menu/gallery', icon:'school'},
    {title:'Location', url:'/menu/locations', icon:'sync'},
    {title:'Logout', url:'/login', icon:'log-out'},
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onMenuItem(m){
    this.router.navigateByUrl(m.url);
  }
}
