import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  constructor(private userservice : UserService) { }

  toPrint;

  ngOnInit() {
  }

  onClick(){
    console.log("GO PLEASE")
    this.userservice.unsubscribe('','')
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
