import { Component, OnInit } from '@angular/core';
import {UserService} from '../user-service.service';
import {stringify} from 'querystring';
import {BetPoolService} from '../bet-pool.service';
import {BetsComponent} from '../bets/bets.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  result;
  solde;
  login;
  fname;
  lname;
  email;
  country;
  birthday;
  betcount;
  constructor(private userservice: UserService, private betpool : BetPoolService) {
  }

  ngOnInit() {
    this.userservice.infoUser(localStorage.getItem('login'), localStorage.getItem('token'))
      .subscribe(  x  => {
        if ( x['status'] === 'KO' ) {
          this.result = x['errorMessage'];
        } else {
          this.login = x['login'] ;
          this.fname = x['first_name'] ;
          this.lname = x['last_name'] ;
          this.birthday = x['birthday'] ;
          this.country = x['country'] ;
          this.email = x['email'] ;
          localStorage.setItem('solde' , x['solde']);
          localStorage.setItem('email', x['email']);
          document.getElementById('avatar').setAttribute('src', this.userservice.getIconUrl(x['email']));
          this.betcount = x['bets'].length;
        }

      },
      e  => console.log(e)
    );
  }
}
