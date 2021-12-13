import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public authentificated: boolean;
  public token: string;
  constructor() { }

 public onAuthentificated(user: string, password: string){
    if(user==='admin' && password==='123'){
      this.authentificated=true;
      this.saveToken();
    }else{
      this.authentificated=false;
    }
    return this.authentificated;
  }
 public saveToken(){
    this.token= 'azerty';
    localStorage.setItem('Maklé', this.token);
  }
//Si le token exist
 public loanToken(){
    this.token=localStorage.getItem('Maklé');
    if(this.token==='azerty'){
      this.authentificated=true;
    }else{
      this.authentificated=false;
    }
    return this.authentificated;
  }
}

