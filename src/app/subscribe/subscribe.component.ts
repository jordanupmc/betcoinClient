import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { UserProfile } from '../userProfile';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(private userService: UserService, private router : Router) { }

  // return null si le password et le confirmpassword sont les meme
  checkPasswords: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
      let pass = group.controls.password.value;
      let confirmPass = group.controls.cpassword.value;
      return pass === confirmPass ? null : { notSame: true } 
  }

  // return null si la date de naissance est < a la date d'aujourd'hui
  dateMax(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
  
    let bday =control.value ;
    let today= new Date().toISOString().split('T')[0];
    return bday < today ? null : { isYoung: true } 
    }
  }

  subscribeForm = new FormGroup({
    login: new FormControl('', [Validators.pattern("[^' ']+") , Validators.maxLength(100)]),
    passwords : new FormGroup({
      password: new FormControl(''),
      cpassword: new FormControl(''),
    }, {validators: this.checkPasswords}),
    email: new FormControl('', Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$")),
    birthday: new FormControl('', this.dateMax("")),
    country: new FormControl(''),
    lname: new FormControl('', Validators.maxLength(100)),
    fname: new FormControl('',Validators.maxLength(100))
  });
  
  error;
  loading;
  countries;

  ngOnInit() {
    this.userService.getCountriesName().subscribe(
      res => {
        this.countries=res;
      }
      ,
      err => {
        this.countries= [{name:"France"}]
      }
    );
  }

  onSubmit(){
      this.loading = true;
      this.userService.subscribe(
        new UserProfile(this.subscribeForm.value.login, this.subscribeForm.value.passwords.password, this.subscribeForm.value.passwords.cpassword,
        this.subscribeForm.value.email, this.subscribeForm.value.lname, this.subscribeForm.value.fname, 
        this.subscribeForm.value.birthday, this.subscribeForm.value.country))
        .subscribe(
          x  => { 
            this.loading=false;
            if(x['status'] == 'KO' ){
              this.error = x['errorMessage'];
              var redir = x['redictLogin'];
              if(redir){
                localStorage.clear();
                window.alert("You have been disconnected\n Please log in again");
                this.router.navigate(['login']);
              }
            } 
            else {
              this.router.navigate(['/login']);
            }
          }, 
          e  => { 
            this.loading=false; 
            this.error = e;
          }
        )
  }

  
}
