import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';


import { BetPoolService } from '../bet-pool.service';

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


  pool;
  haveDoneBet : boolean = false;
  resultIsAvailable : boolean = false;
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
      this.betPoolService.getPool(id).subscribe(pool => {this.pool = pool ; console.log("getPool "+JSON.stringify(pool));resolve(pool) });
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


}
