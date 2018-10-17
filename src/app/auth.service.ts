import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfile } from './userProfile';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'https://betcoinserver.herokuapp.com/'

  constructor( private http: HttpClient) { }

  public login(login, pass) {
    return this.http.get(this.apiURL+'connect?login='+login+'&password='+pass);
  }

  public logout(login, token) {
    return this.http.get(this.apiURL+'disconnect?token='+token+'&login='+login);
  }
}
