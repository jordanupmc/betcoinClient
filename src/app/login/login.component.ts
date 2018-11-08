import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result;
  urlImg;
  isRedirect=false;

  constructor(private authservice : AuthService, private routeur : Router, private route: ActivatedRoute) { }

  authForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });
 
  ngOnInit() {
    this.route.queryParamMap.subscribe(map => { this.isRedirect=map.has("return")})
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
