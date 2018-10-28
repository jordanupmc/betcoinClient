import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice : AuthService) { }

  authForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });
  
  result;
  urlImg;

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
                            // this.result = "WELCOME "+ this.authForm.value.login+" your token is: "+x['token'];
                            localStorage.setItem("token", x['token'])
                            localStorage.setItem("login", this.authForm.value.login)
                            document.getElementById('in-sub').style.display = 'none';
                            document.getElementById('out-ed').style.display = 'block';
                          }

                        }, 
                 e  => console.log(e)
    );
  }

}
