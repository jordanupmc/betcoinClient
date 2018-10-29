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
  
  constructor(private poolservice: BetPoolService, private userservice: UserService) { }

  urlImg;
  messages : any[];

  ngOnInit() {
    this.urlImg = this.userservice.getIconUrl(localStorage.getItem("email"));
    this.poolservice.getAllMessage(this.idPool, localStorage.getItem("login"), localStorage.getItem("token"))
                    .subscribe(res=>{ this.messages = res["messages"]; });
  }

  updateMessages(funcSuccess, funcErr){
    this.poolservice
                              .getMessageFromId(this.idPool, localStorage.getItem("login"), localStorage.getItem("token"), this.messages[this.messages.length-1]['_msgId']['$oid'])
                              .subscribe(
                                funcSuccess,funcErr
                              )
  }

  clearInput(){
    this.textInput.reset();
  }

  isAuthor(msg){
    return msg.gamblerLogin == localStorage.getItem("login");
  }


  sendMessage(){
    if(!this.textInput.valid || (this.textInput.value).trim() == '' )
      return;
    let currentValue =this.textInput.value;
    this.textInput.reset();

    this.poolservice.sendMessage(this.idPool, localStorage.getItem("login"), currentValue, localStorage.getItem("token"))
                    .subscribe(
                      res => {
                          // On met a jour la vue en faisant une requete au serveur pour récup le message envoyé + les eventuels messages recu entre temps
                          if(res["status"] == "OK"){
                            this.updateMessages( res => {
                              if(res["status"] == "OK")
                                for(let msg of res["messages"]){
                                  this.messages.push(msg);
                                }
                          }, 
                            e => {
                                console.log(e);
                            }
                          );
                          }else{
                            //TODO
                            console.log(res);
                          }
                      },
                      err =>{

                      }
                    );
  }

  delete(msg){
    this.poolservice.deleteMessage(this.idPool, localStorage.getItem("login"), localStorage.getItem("token"), msg['_msgId']['$oid'])
                    .subscribe(
                      res => {
                        if(res["status"] == "OK"){
                            let index = this.messages.indexOf(msg);
                            if(index < 0 )
                              return;
                            this.messages.splice(index, 1);
                        }
                      },
                      e=>{
                          console.log(e)
                      });

  }

}
