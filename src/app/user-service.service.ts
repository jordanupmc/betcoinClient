import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfile } from './userProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = 'https://betcoinserver.herokuapp.com/'

  constructor( private http: HttpClient ) { 
  }

  public subscribe(userProfile : UserProfile){
    return this.http.get(this.apiURL+'subscribe?login='+userProfile.login+'&password='+userProfile.password+'&confirmPassword='+userProfile.confirmPassword
    +'&email='+userProfile.email+'&lastName='+userProfile.lastName+'&firstName='+userProfile.firstName+'&dateNaiss='+userProfile.dateNaiss+'&country='+userProfile.country)
  }

  public unsubscribe(login : string, password : string){
    return this.http.get(this.apiURL+'unsubscribe?login='+login+'&password='+password);
  }
}
