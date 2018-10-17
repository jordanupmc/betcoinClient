import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { FormGroup, FormControl } from '@angular/forms';
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
                            this.result = x['token'];
                          }
                        }, 
                 e  => console.log(e)
    );
  }

}