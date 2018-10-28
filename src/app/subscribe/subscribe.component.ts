import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { UserProfile } from '../userProfile';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(private userService: UserService, private router : Router) { }

  subscribeForm = new FormGroup({
    login: new FormControl('', [Validators.pattern("[^' ']+") ]),
    password: new FormControl(''),
    cpassword: new FormControl(''),
    email: new FormControl(''),
    birthday: new FormControl(''),
    country: new FormControl(''),
    lname: new FormControl('', Validators.pattern('[a-zA-Z]+')),
    fname: new FormControl('', Validators.pattern('[a-zA-Z]+'))
  });

  tmp;

  ngOnInit() {
  }

  onSubmit(){
      this.userService.subscribe(new UserProfile(this.subscribeForm.value.login, this.subscribeForm.value.password, this.subscribeForm.value.cpassword,
        this.subscribeForm.value.email, this.subscribeForm.value.lname, this.subscribeForm.value.fname, 
        this.subscribeForm.value.birthday, this.subscribeForm.value.country))
        .subscribe(
          x  => { 
          if(x['status'] == 'KO' ){
            this.tmp = x['errorMessage'];
          } 
          else {
            this.router.navigate(['/login']);
          }
        }, 
 e  => console.log(e));
  }

}
