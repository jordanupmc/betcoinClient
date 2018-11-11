import { Component, OnInit } from '@angular/core';
import {UserService} from '../user-service.service';
import {stringify} from 'querystring';
import {BetPoolService} from '../bet-pool.service';
import {BetsComponent} from '../bets/bets.component';
import {Router} from '@angular/router';

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
  poolfol;
  constructor(private userservice: UserService, private betpool : BetPoolService,private routeur : Router) {
  }

  ngOnInit() {
    this.userservice.infoUser(localStorage.getItem('login'), localStorage.getItem('token'))
      .subscribe(  x  => {
        if ( x['status'] === 'KO' ) {
          this.result = x['errorMessage'];
          var redir = x['redictLogin'];
          if(redir){
            localStorage.clear();
            window.alert("You have been disconnected\n Please log in again");
            this.routeur.navigate(['login']);
          }
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
          this.poolfol = x['subscribePools'].length;
        }

      },
      e  => console.log(e)
    );
  }
}
