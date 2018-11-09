import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';


import { BetPoolService } from '../bet-pool.service';
import { ChatComponent } from '../chat/chat.component';

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
      private router: Router
     ) { }

  @ViewChild(ChatComponent)
  private chatComponent : ChatComponent;

  pool;
  haveDoneBet : boolean = false;
  resultIsAvailable : boolean = false;
  pooltype : boolean;
  variation = [{titre:"Montera", value:1}, {titre:"Descendra", value:-1}]
  result = "";
  betForm = new FormGroup({
    ammount: new FormControl(''),
    betValue: new FormControl('')
  });

  

  async ngOnInit() {
    await this.getPool();
    this.hasBet();
    this.resultAvailable();
  }

  public async getPool() {

    return new Promise( (resolve,reject) => {
      const id = +this.route.snapshot.paramMap.get('id');
      this.betPoolService.getPool(id).subscribe(pool => {this.pool = this.addImgUrl(pool) ; this.pooltype = this.pool.pooltype ;console.log("getPool "+JSON.stringify(pool));resolve(pool) });
    })
   
  }

  bet(){
    this.betPoolService
    .addBet(localStorage.getItem("login"), localStorage.getItem("token"), JSON.stringify(this.pool.idbetpool), this.betForm.value.ammount, this.betForm.value.betValue)
    .subscribe(  x  => { 
                          if(x['status'] == 'KO' ){

                            console.log("Bet fail : " +x['errorMessage']);
                            this.result = x['errorMessage'];
                          }
                          else{
                            console.log("Bet Succes ");
                            this.hasBet();
                          }

                        }, 
                 e  => console.log(e)
    );
  }

  quitPool(){
    this.betPoolService
    .quitPool(localStorage.getItem("login"), JSON.stringify(this.pool.idbetpool), localStorage.getItem("token"))
    .subscribe(  x  => { 
                          console.log("quitPool "+x);
                          if(x['status'] == 'KO' ){
                            this.result = x['errorMessage'];
                            console.log("Bet fail : " +x['errorMessage'])
                          }
                          else{
                            console.log("Quit Succes ")
                            this.router.navigate(['/listPool']);
                          }

                        }, 
                 e  => console.log(e)
    );
  }

  hasBet(){
    this.betPoolService
    .hasBet(localStorage.getItem("login"), localStorage.getItem("token"), JSON.stringify(this.pool.idbetpool))
    .subscribe(  x  => { 
                          console.log(x);
                          if(x['status'] == 'KO' ){
                            this.result = x['errorMessage'];

                            console.log("hasBet fail : " +x['errorMessage'])
                          }
                          else{
                            console.log("hasBet Succes ");
                            this.haveDoneBet = x['result'];
                          }

                        }, 
                 e  => console.log(e) 
    );
  }

  cancelBet(){
    this.betPoolService
    .cancelBet(localStorage.getItem("login"), localStorage.getItem("token"), JSON.stringify(this.pool.idbetpool))
    .subscribe(  x  => { 
                          console.log(x);
                          if(x['status'] == 'KO' ){
                            console.log("cancelBet fail : " +x['errorMessage'])
                            this.result = x['errorMessage'];

                          }
                          else{
                            this.hasBet();
                            this.router.navigate(['/listPool']);

                          }
                        }, 
                 e  => console.log(e)
    );
  }

  retrieve(){
    this.betPoolService
    .gainRetrieval(localStorage.getItem("login"), localStorage.getItem("token"), JSON.stringify(this.pool.idbetpool))
    .subscribe(  x  => { 
                          console.log(x);
                          if(x['status'] == 'KO' ){
                            console.log("gainRetrieval fail : " +x['errorMessage'])
                            this.result = x['errorMessage'];

                          }
                          else{
                            this.result = x['result']+x['gain'];  
                            this.resultAvailable();
                          }
                        }, 
                 e  => console.log(e)
    );
  }

  resultAvailable(){
    this.betPoolService
    .resultAvailable(localStorage.getItem("login"), localStorage.getItem("token"), JSON.stringify(this.pool.idbetpool))
    .subscribe(  x  => { 
                          console.log(x);
                          if(x['status'] == 'KO' ){
                            this.result = x['errorMessage'];
                            console.log("resultAvailable fail : " +x['errorMessage'])
                          }
                          else{
                            console.log("resultAvailable Succes "+x['result']);
                            this.resultIsAvailable = x['result'];
                          }

                        }, 
                 e  => console.log(e)
    );
  }


  private addImgUrl( pool ){
      switch (pool['cryptocurrency']){
        case "Bitcoin" : pool.imgUrl= "./assets/img/btc.png"; break;
        case "Ethereum" : pool.imgUrl= "./assets/img/eth_logo.jpeg"; break;
        case "XRP" : pool.imgUrl= "./assets/img/xrp.png"; break;
        case "EthereumClassic" : pool.imgUrl= "./assets/img/etc_new.png"; break;
        case "LiteCoin" : pool.imgUrl= "./assets/img/litecoin_logo.png"; break;
        case "EOS" : pool.imgUrl= "./assets/img/eos_1.png"; break;
        case "BitcoinCash" : pool.imgUrl= "./assets/img/btc_cash.png"; break;
        case "ZCash" : pool.imgUrl= "./assets/img/zec.png"; break;
        case "NEO" : pool.imgUrl= "./assets/img/neo.jpg"; break;
        case "Dash" : pool.imgUrl= "./assets/img/dash.png"; break;
      }
    
    return pool;
  }
}
