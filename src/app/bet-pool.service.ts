import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from './url.constants';

import { BetPool } from './betPool';


@Injectable({
  providedIn: 'root'
})
export class BetPoolService {
  constructor(private http: HttpClient) { }


  public getPools(){
    return this.http.get(apiURL+"getListPool");
  }

  public enterPool(login, idPool, token){
    return this.http.post(apiURL+"enterPool", { login : login, token : token, idPool : idPool});
  }

  public getPool(id){
    return this.http.get(apiURL+"getPoolInfo?idPool="+id);
  }

  public addBet(login, token, idPool, ammount, value) {
    return this.http.post(apiURL+"addBet", { login : login, token : token, idPool : idPool, betAmmount : ammount, betValue : value});
  }

  public quitPool(login, idPool, token){
    return this.http.post(apiURL+"quitPool", { login : login, token : token, idPool : idPool});
  }
}
