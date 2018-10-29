import { Component, OnInit } from '@angular/core';
import {UserService} from '../user-service.service';
import {stringify} from 'querystring';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(private userservice: UserService) { }

  ngOnInit() {
    const dataAccount = this.userservice.infoUser(localStorage.getItem('login'), localStorage.getItem('token'));
    const jsonData = JSON.parse(dataAccount.toString());
    document.getElementById('login_account').innerHTML = jsonData.login.value ;
    document.getElementById('fname_account').innerText = jsonData.first_name.value ;
    document.getElementById('lname_account').innerText = jsonData.last_name.value ;
    document.getElementById('birthday_account').innerText = jsonData.birthday.value ;
    document.getElementById('country_account').innerText = jsonData.country.value ;
    document.getElementById('email_account').innerText = jsonData.email.value ;


  }

}
