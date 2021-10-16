import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public authentificated: boolean;
  public token: string;
  constructor() { }

  onAuthentificated(user: string, password: string){
    if(user==='admin' && password==='123'){
      this.authentificated=true;
      this.saveToken();
    }else{
      this.authentificated=false;
    }
    return this.authentificated;
  }
  saveToken(){
    this.token= 'azerty';
    localStorage.setItem('Maklé', this.token);
  }
  loanToken(){
    this.token=localStorage.getItem('Maklé');
    if(this.token==='azerty'){
      this.authentificated=true;
    }else{
      this.authentificated=false;
    }
    return this.authentificated;
  }
}

