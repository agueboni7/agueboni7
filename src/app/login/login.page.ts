import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private servAuth: AuthentificationService, private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit(user){
    const authed=this.servAuth.onAuthentificated(user.username, user.password);
    if(authed===true){
      this.router.navigateByUrl('menu/home');
    }else{
      this.router.navigateByUrl('login');
    }
  }
}
