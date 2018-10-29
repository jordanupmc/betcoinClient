import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from './url.constants';


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

  public sendMessage(idPool : string, login : string, msg: string, token){
    return this.http.post(apiURL+"messagePool", {idPool : idPool+"", login : login, msg : msg, token:  token});
  }

  public hasBet(login, token, idPool){
    return this.http.get(apiURL+"hasBet?idPool="+idPool+"&login="+login+"&token="+token);
  }

  public cancelBet(login, token, idPool){
    return this.http.post(apiURL+"cancelBet", {idPool : idPool, login : login, token:  token});
    }

  public getAllMessage(idPool, login, token){
    return this.http.get(apiURL+"getListMessage?idPool="+idPool+"&login="+login+"&token="+token);
  }

  public getMessageFromId(idPool, login, token, fromMsgId){
    return this.http.get(apiURL+"getListMessage?idPool="+idPool+"&login="+login+"&token="+token+"&from="+fromMsgId);
  }

  public deleteMessage(idPool, login, token, toDelete){
      return this.http.post(apiURL+"deleteMessage", {idPool: idPool+"", login: login, token : token, msgId : toDelete});
  }

  public getListBets(login, token) {
    return this.http.get(apiURL+"getListBets?login="+login+"&token="+token);
  }

  public resultAvailable(login, token, idPool) {
    return this.http.get(apiURL+"betResultAvailable?idPool="+idPool+"&login="+login+"&token="+token);
  }

  public gainRetrieval(login, token, idPool){
    return this.http.post(apiURL+"retrieve", {idPool: idPool, login: login, token : token});
  }

}
