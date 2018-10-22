import { Component, OnInit } from '@angular/core';
import { BetPoolService } from '../bet-pool.service';

@Component({
  selector: 'app-list-pool',
  templateUrl: './list-pool.component.html',
  styleUrls: ['./list-pool.component.css']
})
export class ListPoolComponent implements OnInit {

  constructor(private betpool : BetPoolService) { }

  activePools=[];

  ngOnInit() {
    this.betpool.getPools().subscribe(
      res => {this.activePools= this.addImgUrl(res['betpools']); console.log(this.activePools)}
    );
  }

  private addImgUrl( pools ){
    for(let pool of pools){
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
    }
    return pools;
  }

}
