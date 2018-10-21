import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice : AuthService, private userservice : UserService) { }

  authForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });
  
  result;
  urlImg;

  ngOnInit() {
  }

  
  onSubmit(){
    function callbackN(profile){
      console.log(profile)
    }
    this.urlImg=this.userservice.getIconUrl("jordan.ji-ji@live.fr");
    
    this.authservice
    .login(this.authForm.value.login, this.authForm.value.password)
    .subscribe(  x  => { 
                          if(x['status'] == 'KO' ){
                            this.result = x['errorMessage'];
                          }
                          else{
                            this.result = "WELCOME "+ this.authForm.value.login+" your token is: "+x['token'];
                            localStorage.setItem("token", x['token'])
                            localStorage.setItem("login", this.authForm.value.login)
                          }

                        }, 
                 e  => console.log(e)
    );
  }

}