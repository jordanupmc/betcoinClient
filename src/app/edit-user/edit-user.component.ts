import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private userservice: UserService) { }
  editUserForm = new FormGroup({
    passwordcur: new FormControl(''),
    passwordnew: new FormControl(''),
    passwordconf: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl('')
  });

  result;
  urlImg;

  ngOnInit() {
  }

  onSubmit() {
    const fieldName: string[] = ["password", "last_name", "first_name", "email", "country"];
    if (this.editUserForm.value.passwordnew === this.editUserForm.value.passwordconf) {
      const newValue: string[] = [this.editUserForm.value.passwordnew, this.editUserForm.value.lastname,
        this.editUserForm.value.firstname, this.editUserForm.value.email, this.editUserForm.value.country];
      let i = 0;
      let test = 0;
      for (i = 0; i < 5; i++) {
        if (newValue[i] != null) {
          test = 1;
        }
      }
      if (test !== 1) {
        this.userservice.editUser(localStorage.getItem("login"), localStorage.getItem("token"),
          this.editUserForm.value.passwordcur, fieldName, newValue)
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
      console.log("test")
      this.editUserForm.value.passwordconf = 'password doesn\'t match';
    }
  }
}
