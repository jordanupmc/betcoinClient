import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from './url.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }
  constructor( private http: HttpClient) { }

  public login(login, pass) {
    return this.http.post(apiURL+"connect", { login : login , password : pass });
  }

  public logout(login : string, token : string){
    return this.http.post(apiURL+"disconnect", { login : login, token : token});
  }
}
