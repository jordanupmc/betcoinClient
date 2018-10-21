import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BetPoolService {
  constructor(private http: HttpClient) { }
  private apiURL = 'https://betcoinserver.herokuapp.com/'
  public getPools(){
    return this.http.get(this.apiURL+"getListPool");
  }
}
