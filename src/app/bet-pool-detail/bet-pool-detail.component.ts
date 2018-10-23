import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormGroup, FormControl, Validators } from '@angular/forms';


import { BetPoolService } from '../bet-pool.service';
import { BetPool } from './betPool';




@Component({  
  selector: 'app-bet-pool-detail',
  templateUrl: './bet-pool-detail.component.html',
  styleUrls: ['./bet-pool-detail.component.css']
})

export class BetPoolDetailComponent implements OnInit {
  constructor(
      private route: ActivatedRoute,
      private betPoolService: BetPoolService,
      private location: Location
     ) { }


  pool : BetPool;
  betForm = new FormGroup({
    ammount: new FormControl(''),
    betValue: new FormControl('')
  });

  

  ngOnInit() {
  	this.getPool();
  }

  public getPool() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.betPoolService.getPool(id).subscribe(pool => this.pool = pool);
  }

  onSubmit(){
    this.betPoolService
    .addBet(localStorage.getItem("login"), localStorage.getItem("token"), this.pool.idbetpool, this.betForm.value.ammount, this.betForm.value.betValue)
    .subscribe(  x  => { 
                          if(x['status'] == 'KO' ){

                            console.log("Bet fail : " +x['errorMessage'])
                          }
                          else{
                            console.log("Bet Succes ")
                          }

                        }, 
                 e  => console.log(e)
    );
  }

  quitPool(){
    this.betPoolService
    .quitPool(localStorage.getItem("login"), this.pool.idbetpool, localStorage.getItem("token"))
    .subscribe(  x  => { 
                          if(x['status'] == 'KO' ){

                            console.log("Bet fail : " +x['errorMessage'])
                          }
                          else{
                            console.log("Quit Succes ")
                          }

                        }, 
                 e  => console.log(e)
    );
  }




}
