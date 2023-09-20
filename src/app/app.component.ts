import { LocationsService } from './services/locations.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(public servAuth: AuthentificationService,
     private router: Router, private servLoc:LocationsService) {}
  ngOnInit(): void {
    this.servLoc.createDatabase();
    this.inAuthed();
  }
  inAuthed(){
    const aut=this.servAuth.loanToken();
    if(aut===true){
      this.router.navigate(['/menu/home']);
    }
  }
}
