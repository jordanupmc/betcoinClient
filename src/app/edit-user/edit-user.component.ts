import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private userservice : UserService) { }
  urlImg;
  editUserForm = new FormGroup({
    passwordcur: new FormControl(''),
    passwordnew: new FormControl(''),
    passwordconf: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl('')
  });
  
  ngOnInit() {
    this.urlImg= this.userservice.getIconUrl(localStorage.getItem("email"))
  }

  onSubmit(){

  }

  



}
