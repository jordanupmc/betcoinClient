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
        case "Bitcoin" : pool.imgUrl= "./assets/img/btc.png"
      }
    }
    return pools;
  }

}
