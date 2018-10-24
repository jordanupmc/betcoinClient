import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from './url.constants';
import { Observable, of } from 'rxjs';
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

  public getPool(id){
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

  public sendMessage(idPool, login, msg, token){
    return this.http.post(apiURL+"messagePool", {idPool : idPool, login : login, msg : msg, token:  token});
  }

  private mock_messages = {
    "messages": [
      {
          "gamblerLogin": "mick",
          "text": "\"Salut a tous\"",
          "messageDate": {
              "$date": "2018-10-11T17:57:02.405Z"
          }
      },
      {
          "gamblerLogin": "mick",
          "text": "\"Salam les Khey\"",
          "messageDate": {
              "$date": "2018-10-12T16:22:56.808Z"
          }
      },
      {
          "gamblerLogin": "mick",
          "text": "",
          "messageDate": {
              "$date": "2018-10-12T16:23:38.420Z"
          }
      },
      {
          "gamblerLogin": "mick",
          "text": "LOG :1540049184335",
          "messageDate": {
              "$date": "2018-10-20T15:26:26.255Z"
          }
      },
      {
          "gamblerLogin": "mick",
          "text": "LOG :1540049194316",
          "messageDate": {
              "$date": "2018-10-20T15:26:34.416Z"
          }
      },
      {
          "gamblerLogin": "mick",
          "text": "LOG :1540049204317",
          "messageDate": {
              "$date": "2018-10-20T15:26:44.417Z"
          }
      },
      {
          "gamblerLogin": "mick",
          "text": "LOG :1540050668854",
          "messageDate": {
              "$date": "2018-10-20T15:51:10.692Z"
          }
      },
      {
          "gamblerLogin": "mick",
          "text": "LOG :1540051939278",
          "messageDate": {
              "$date": "2018-10-20T16:12:22.413Z"
          }
      },
      {
          "gamblerLogin": "mick",
          "text": "LOG :1540051949225",
          "messageDate": {
              "$date": "2018-10-20T16:12:30.361Z"
          }
      },
      {
          "gamblerLogin": "mick",
          "text": "LOG :1540052976416",
          "messageDate": {
              "$date": "2018-10-20T16:29:39.462Z"
          }
      }
    ]
  };
  public getMessage(){
    return of (this.mock_messages); 
  }
}
