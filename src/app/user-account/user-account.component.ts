import { Component, OnInit } from '@angular/core';
import {UserService} from '../user-service.service';
import {stringify} from 'querystring';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  result;

  constructor(private userservice: UserService) {
  }

  ngOnInit() {
    this.userservice.infoUser(localStorage.getItem('login'), localStorage.getItem('token'))
      .subscribe(  x  => {
        if ( x['status'] === 'KO' ) {
          this.result = x['errorMessage'];
        } else {
          document.getElementById('login_account').innerText = x['login'] ;
          document.getElementById('fname_account').innerText = x['first_name'] ;
          document.getElementById('lname_account').innerText = x['last_name'] ;
          document.getElementById('birthday_account').innerText = x['birthday'] ;
          document.getElementById('country_account').innerText = x['country'] ;
          document.getElementById('email_account').innerText = x['email'] ;
        }

      },
      e  => console.log(e)
    );
  }

}
