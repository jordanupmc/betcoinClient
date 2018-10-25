import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BetPoolService } from '../bet-pool.service';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() idPool : string;
  textInput = new FormControl('', [Validators.required]);
  
  constructor(private poolservice: BetPoolService, private userservice: UserService) { this.idPool = "48"}

  urlImg;
  messages;

  ngOnInit() {
    this.urlImg = this.userservice.getIconUrl(localStorage.getItem("email"));
    this.poolservice.getMessage().subscribe(res=>{ this.messages = res["messages"]; });
  }

  sendMessage(){
    if(!this.textInput.valid)
      return;
    console.log(this.textInput.value);
    let currentValue =this.textInput.value;
    this.poolservice.sendMessage(this.idPool, localStorage.getItem("login"), this.textInput.value, localStorage.getItem("token"))
                    .subscribe(
                      res => {
                          if(res["status"] == "OK"){
                              console.log("MSG SENT !")
                              this.messages.push({
                                "gamblerLogin": localStorage.getItem("login"),
                                "text": this.textInput.value,
                                "messageDate": {
                                    "$date": new Date().getTime()
                                }
                            });
                          }else{
                            //TODO
                            console.log(res);
                          }
                      },
                      err =>{

                      }
                    );
  }
}
