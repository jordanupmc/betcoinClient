import { Component, OnInit } from '@angular/core';
import { BetPoolService } from '../bet-pool.service';
import {Router } from '@angular/router';


@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  constructor(
    private betpool : BetPoolService,
    private router: Router
    ) { }

  myBets;
  result;

  ngOnInit() {
    this.getMyBets();
  }

  getMyBets(){
    this.betpool.getListBets(localStorage.getItem("login"), localStorage.getItem("token"))
    .subscribe(res => {this.myBets = this.fillPoolTypeAndCurrency(res['bets'])}
    );
  }


  retrieve(bet){
    this.betpool
    .gainRetrieval(localStorage.getItem("login"), localStorage.getItem("token"), bet.idBetPool)
    .subscribe(  x  => { 
                          console.log(x);
                          if(x['status'] == 'KO' ){
                            console.log("gainRetrieval fail : " +x['errorMessage'])
                            this.result = x['errorMessage'];

                          }
                          else{
                            this.result = x['result']+x['gain'];  
                            bet.resultAvailable = false;
                          }
                        }, 
                 e  => console.log(e)
    );
  }

  resultAvailable(bet){
    console.log(bet);
    this.betpool
    .resultAvailable(localStorage.getItem("login"), localStorage.getItem("token"), bet.idBetPool)
    .subscribe(  x  => { 
                          console.log(x);
                          if(x['status'] == 'KO' ){
                            this.result = x['errorMessage'] + bet.idBetPool;
                            console.log("resultAvailable fail : " +x['errorMessage'])
                          }
                          else{
                            // console.log("resultAvailable Succes "+x['result']);
                            bet.resultAvailable = x['result'];
                          }

                        }, 
                 e  => console.log(e)
    );
  }


  private fillResultAvailable( myBets ){
    for(let bet of myBets){
      this.resultAvailable(bet);
    }
    return myBets;
  }


  private fillPoolTypeAndCurrency(myBets){
    for(let bet of myBets){
      this.PoolTypeAndCurrencyAvailable(bet);
      this.resultAvailable(bet);
      // this.addImgUrl(bet);  
      // console.log(bet);
    }
    return myBets;
  }

  PoolTypeAndCurrencyAvailable(bet){
    this.betpool
    .getPool(bet.idBetPool)
    .subscribe(  x  => { 
                          console.log(x);
                          if(x['status'] == 'KO' ){
                            this.result = x['errorMessage'] + bet.idBetPool;
                            console.log("PoolTypeAndCurrencyAvailable fail : " +x['errorMessage'])
                          }else{
                            // console.log("PoolTypeAndCurrencyAvailable Succes "+x['result']);
                            bet.cryptocurrency = x['cryptocurrency'];
                            this.addImgUrl(bet, x['cryptocurrency']);
                            bet.pooltype = x['pooltype'];
                            bet.name = x['name'];
                          }
                        }, 
                 e  => console.log(e)
    );
  }


  private addImgUrl(bet, crypto ){
    switch (crypto){
      case "Bitcoin" : bet.imgUrl= "./assets/img/btc.png"; break;
      case "Ethereum" : bet.imgUrl= "./assets/img/eth_logo.jpeg"; break;
      case "XRP" : bet.imgUrl= "./assets/img/xrp.png"; break;
      case "EthereumClassic" : bet.imgUrl= "./assets/img/etc_new.png"; break;
      case "LiteCoin" : bet.imgUrl= "./assets/img/litecoin_logo.png"; break;
      case "EOS" : bet.imgUrl= "./assets/img/eos_1.png"; break;
      case "BitcoinCash" : bet.imgUrl= "./assets/img/btc_cash.png"; break;
      case "ZCash" : bet.imgUrl= "./assets/img/zec.png"; break;
      case "NEO" : bet.imgUrl= "./assets/img/neo.jpg"; break;
      case "Dash" : bet.imgUrl= "./assets/img/dash.png"; break;
    }
  
    return bet;
  }


  

}
