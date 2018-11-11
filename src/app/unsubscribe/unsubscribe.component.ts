import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  constructor(private userservice : UserService, private router : Router) { }

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
                var redir = x['redictLogin'];
                if(redir){
                  localStorage.clear();
                  window.alert("You have been disconnected\n Please log in again");
                  this.router.navigate(['login']);
                }
              }else{
                this.toPrint = 'Success';
              }
      },
      e => console.log(e)
       );
  }
}
