import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result;
  urlImg;

  constructor(private authservice : AuthService, private routeur : Router) { }

  authForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });
 
  ngOnInit() {
  }

  onSubmit(){

    this.authservice
    .login(this.authForm.value.login, this.authForm.value.password)
    .subscribe(  x  => { 
                          if(x['status'] == 'KO' ){
                            this.result = x['errorMessage'];
                          }
                          else{
                            localStorage.clear();
                            localStorage.setItem("token", x['token'])
                            localStorage.setItem("login", this.authForm.value.login)

                            this.routeur.navigate(['listPool']);
                          }

                        }, 
                 e  => this.result=e
    );
  }

}
