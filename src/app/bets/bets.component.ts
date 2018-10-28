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

  myBets=[];
  result;

  ngOnInit() {
    this.getMyBets();
  }

  getMyBets(){
    this.betpool.getListBets(localStorage.getItem("login"), localStorage.getItem("token"))
    .subscribe(res => {this.myBets= this.fillResultAvailable(res['bets'])}
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

}
