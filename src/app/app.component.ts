import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(public servAuth: AuthentificationService, private router: Router) {}
  ngOnInit(): void {
    this.inAuthed();
  }
  inAuthed(){
    const aut=this.servAuth.loanToken();
    if(aut===true){
      this.router.navigate(['/menu/home']);
    }
  }
}
