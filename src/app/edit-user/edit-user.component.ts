import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import {FormGroup, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private userservice: UserService) { }

    checkPasswords: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
      let pass = group.controls.passwordNew.value;
      let confirmPass = group.controls.passwordConf.value;
      return pass === confirmPass ? null : { notSame: true };
    }

  editUserForm = new FormGroup({
    passwords : new FormGroup({
      passwordCur: new FormControl(''),
      passwordNew: new FormControl(''),
      passwordConf: new FormControl('')
    }, {validators: this.checkPasswords}),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl('')
  });

  result;
  urlImg;
  countries;

  ngOnInit() {
    document.getElementById("avatar").setAttribute('src',this.userservice.getIconUrl(localStorage.getItem("email")));
    this.userservice.getCountriesName().subscribe(
      res => {
        this.countries=res;
        console.log(this.countries)
      }
      ,
      err => {
        this.countries= [{name:"France"}]
      }
    );
  }

  onSubmit() {
    const fieldName = ['password', 'last_name', 'first_name', 'email', 'country'];
    if (this.editUserForm.value.passwords.passwordNew === this.editUserForm.value.passwords.passwordConf) {
      const newValue: string[] = [this.editUserForm.value.passwords.passwordNew, this.editUserForm.value.lastname,
        this.editUserForm.value.firstname, this.editUserForm.value.email, this.editUserForm.value.country];
      let i = 0;
      let test = 0;
      for (i = 0; i < 5; i++) {
        if (newValue[i].length !== 0 ) {
          this.result = i;
          test = 1;
        }
      }
      if (test === 1) {
        this.userservice.editUser(localStorage.getItem("login"), localStorage.getItem("token"),
          this.editUserForm.value.passwords.passwordCur, JSON.stringify(fieldName), JSON.stringify(newValue))
          .subscribe(x => {
              if ( x['status'] === 'KO') {
                this.result = x['errorMessage'];
              } else {
                this.result = 'Successfully set up your new account informations';
              }
            },
            e => console.log(e)
          );
      }
    } else {
      this.result = 'password doesn\'t match';
    }
  }
}
