import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from './url.constants';

@Injectable({
  providedIn: 'root'
})
export class CryptoCompareService {

  constructor( private http: HttpClient ) { 
  }

  public getPriceBetweenInterval(currency: string, debut : Date, fin : Date){
    return this.http.get(apiURL+"getCryptoMin?cryptName="+currency+"&devise=USD&fin=1540301781&debut=1540294581")
  }
}
