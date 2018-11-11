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
    .subscribe(res => {
        if (res['status'] == 'KO') {
          this.result = res['errorMessage'];
          var redir = res['redictLogin'];
          if (redir) {
            localStorage.clear();
            window.alert("You have been disconnected\n Please log in again");
            this.router.navigate(['login']);
          }
        } else {
          this.myBets = this.fillPoolTypeAndCurrency(res['bets'])
        }
      }
    );
  }


  retrieve(bet){
    this.betpool
    .gainRetrieval(localStorage.getItem("login"), localStorage.getItem("token"), bet.idBetPool)
    .subscribe(  x  => { 
                          if(x['status'] == 'KO' ){
                            this.result = x['errorMessage'];
                            var redir = x['redictLogin'];
                            if(redir){
                              localStorage.clear();
                              window.alert("You have been disconnected\n Please log in again");
                              this.router.navigate(['login']);
                            }

                          }
                          else{
                            this.result = x['result']+x['gain'];  
                            bet.resultAvailable = false;
                          }
                        }, 
    );
  }

  resultAvailable(bet){
    this.betpool
    .resultAvailable(localStorage.getItem("login"), localStorage.getItem("token"), bet.idBetPool)
    .subscribe(  x  => { 
                          if(x['status'] == 'KO' ){
                            this.result = x['errorMessage'] + bet.idBetPool;
                            var redir = x['redictLogin'];
                            if(redir){
                              localStorage.clear();
                              window.alert("You have been disconnected\n Please log in again");
                              this.router.navigate(['login']);
                            }
                          }
                          else{
                            bet.resultAvailable = x['result'];
                          }

                        }, 
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
      this.resultAvailable(bet);
      this.PoolTypeAndCurrencyAvailable(bet);
    }
    return myBets;
  }

  PoolTypeAndCurrencyAvailable(bet){
    this.betpool
    .getPool(bet.idBetPool)
    .subscribe(  x  => { 
                          if(x['status'] == 'KO' ){
                            this.result = x['errorMessage'] + bet.idBetPool;
                            var redir = x['redictLogin'];
                            if(redir){
                              localStorage.clear();
                              window.alert("You have been disconnected\n Please log in again");
                              this.router.navigate(['login']);
                            }
                          }else{
                            bet.cryptocurrency = x['cryptocurrency'];
                            this.addImgUrl(bet, x['cryptocurrency']);
                            bet.pooltype = x['pooltype'];
                            bet.name = x['name'];
                            bet.resultbet = x['resultbet'];
                            if(bet.resultAvailable == false && (Date.now() - Date.parse(bet.resultbet)) > 0){
                              bet.resultTaken = true;
                            }else{
                              bet.resultTaken = false;
                            }
                          }
                        }, 
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
