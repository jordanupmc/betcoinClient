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
    return this.http.get(apiURL+"enterPool?token="+token+"&login="+login+"&idPool="+idPool);
  }

  public getPool(id): Observable<BetPool>{
    return this.http.get(apiURL+"getPoolInfo?idPool="+id);
  }

  public addBet(login, token, idPool, ammount, value) {
  	console.log(apiURL+"addBet?token="+token+"&login="+login+"&idPool="+idPool+"&betAmmount="+ammount+"&betValue="+value);
    return this.http.get(apiURL+"addBet?token="+token+"&login="+login+"&idPool="+idPool+"&betAmmount="+ammount+"&betValue="+value);
  }

  public quitPool(login, idPool, token){
    	console.log(apiURL+"quitPool?token="+token+"&login="+login+"&idPool="+idPool);

    return this.http.get(apiURL+"quitPool?token="+token+"&login="+login+"&idPool="+idPool);
  }
}
