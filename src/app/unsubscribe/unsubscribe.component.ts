import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  constructor(private userservice : UserService) { }

  toPrint;
  unsubForm = new FormGroup({
    password: new FormControl('')
  });

  ngOnInit() {
  }

  onSubmit(){
    this.userservice.unsubscribe(localStorage.getItem("login"), localStorage.getItem("token"),this.unsubForm.value.password)
    .subscribe( 
      x => {
              if(x['status'] == 'KO'){
                this.toPrint = x['errorMessage'];
              }else{
                this.toPrint = 'Success';
              }
      },
      e => console.log(e)
       );
  }
}
