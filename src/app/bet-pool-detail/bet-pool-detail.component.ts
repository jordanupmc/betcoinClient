import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Router } from '@angular/router';
import {AppComponent} from '../app.component';

import { FormGroup, FormControl, Validators } from '@angular/forms';


import { BetPoolService } from '../bet-pool.service';
import { ChatComponent } from '../chat/chat.component';
import {UserService} from '../user-service.service';

@Component({  
  selector: 'app-bet-pool-detail',
  templateUrl: './bet-pool-detail.component.html',
  styleUrls: ['./bet-pool-detail.component.css']
})

export class BetPoolDetailComponent implements OnInit {
  constructor(
      private route: ActivatedRoute,
      private betPoolService: BetPoolService,
      private location: Location,
      private router: Router,
      private userservice: UserService,
      private appcomp: AppComponent
     ) { }

  @ViewChild(ChatComponent)
  private chatComponent : ChatComponent;

  pool;
  haveDoneBet : boolean = false;
  resultIsAvailable : boolean = false;
  pooltype : boolean;
  resultTaken : boolean;
  variation = [{titre:"Montera", value:1}, {titre:"Descendra", value:-1}]
  result = "";
  betForm = new FormGroup({
    ammount: new FormControl('',Validators.pattern("[0-9]+")),
    betValue: new FormControl('', Validators.pattern("[0-9]+([.,][0-9]+)?$"))
  });

  

  async ngOnInit() {
    await this.getPool();
    this.hasBet();
    this.resultAvailable();
  }

  public async getPool() {

    return new Promise( (resolve,reject) => {
      const id = +this.route.snapshot.paramMap.get('id');
      this.betPoolService.getPool(id).subscribe(pool => {this.pool = this.addImgUrl(pool) ; this.pooltype = this.pool.pooltype ;resolve(pool) });
    })
   
  }

  bet(){
    this.betPoolService
    .addBet(localStorage.getItem("login"), localStorage.getItem("token"), JSON.stringify(this.pool.idbetpool), this.betForm.value.ammount, this.betForm.value.betValue)
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
                            this.hasBet();
                            this.appcomp.updateSolde();
                          }
                        }, 
    );
  }

  quitPool(){
    this.betPoolService
    .quitPool(localStorage.getItem("login"), JSON.stringify(this.pool.idbetpool), localStorage.getItem("token"))
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
                            this.router.navigate(['/listPool']);
                          }

                        }, 
    );
  }

  hasBet(){
    this.betPoolService
    .hasBet(localStorage.getItem("login"), localStorage.getItem("token"), JSON.stringify(this.pool.idbetpool))
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
                            this.haveDoneBet = x['result'];
                          }
                        }, 
    );
  }

  cancelBet(){
    this.betPoolService
    .cancelBet(localStorage.getItem("login"), localStorage.getItem("token"), JSON.stringify(this.pool.idbetpool))
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
                            this.hasBet();
                            this.appcomp.updateSolde();
                            this.router.navigate(['/listPool']);
                          }
                        }, 
    );
  }

  retrieve(){
    this.betPoolService
    .gainRetrieval(localStorage.getItem("login"), localStorage.getItem("token"), JSON.stringify(this.pool.idbetpool))
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
                            this.resultAvailable();
                            this.appcomp.updateSolde();

                          }
                        }, 
    );
  }

  resultAvailable(){
    this.betPoolService
    .resultAvailable(localStorage.getItem("login"), localStorage.getItem("token"), JSON.stringify(this.pool.idbetpool))
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
                            this.resultIsAvailable = x['result'];
                            if(this.resultIsAvailable == false && (Date.now() - Date.parse(this.pool.resultbet)) > 0){
                              this.resultTaken = true;
                            }else{
                              this.resultTaken = false;
                            }
                          }
                        }, 
    );
  }


  private addImgUrl( pool ){
      switch (pool['cryptocurrency']){
        case "Bitcoin" : pool.imgUrl= "./assets/img/btc.png"; pool.currency="BTC"; break;
        case "Ethereum" : pool.imgUrl= "./assets/img/eth_logo.jpeg"; pool.currency="ETH"; break;
        case "XRP" : pool.imgUrl= "./assets/img/xrp.png"; pool.currency="XRP"; break;
        case "EthereumClassic" : pool.imgUrl= "./assets/img/etc_new.png"; pool.currency="ETC"; break;
        case "LiteCoin" : pool.imgUrl= "./assets/img/litecoin_logo.png"; pool.currency="LTC"; break;
        case "EOS" : pool.imgUrl= "./assets/img/eos_1.png"; pool.currency="EOS"; break;
        case "BitcoinCash" : pool.imgUrl= "./assets/img/btc_cash.png"; pool.currency="BCH"; break;
        case "ZCash" : pool.imgUrl= "./assets/img/zec.png"; pool.currency="ZEC"; break;
        case "NEO" : pool.imgUrl= "./assets/img/neo.jpg"; pool.currency="NEO"; break;
        case "Dash" : pool.imgUrl= "./assets/img/dash.png"; pool.currency="DASH"; break;
      }
    
    return pool;
  }
}
