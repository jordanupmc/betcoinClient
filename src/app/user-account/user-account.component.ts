import { Component, OnInit } from '@angular/core';
import {UserService} from '../user-service.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(private userservice: UserService) { }

  ngOnInit() {
    var dataAccount = this.userservice.infoUser(localStorage.getItem("login"), localStorage.getItem("token"));
  }

}
