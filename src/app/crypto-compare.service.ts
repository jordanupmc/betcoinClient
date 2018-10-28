import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from './url.constants';

@Injectable({
  providedIn: 'root'
})
export class CryptoCompareService {

  constructor( private http: HttpClient ) { 
  }

  // TODO mettre devise = EUR
  public getPriceBetweenInterval(currency: string, debut : number, fin : number){
    return this.http.get(apiURL+"getCryptoMin?cryptName="+currency+"&devise=USD&fin="+fin+"&debut="+debut)
  }
}
