import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BetPoolService } from '../bet-pool.service';
import { UserService } from '../user-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() idPool : string;
  textInput = new FormControl('', [Validators.required]);
  
  constructor(private poolservice: BetPoolService, private userservice: UserService, private routeur : Router) { }

  urlImg;
  messages : any[];
  loading=false;
  gravatarUrl : any[];

  ngOnInit() {  
    this.poolservice.getAllMessage(this.idPool, localStorage.getItem("login"), localStorage.getItem("token"))
                    .subscribe(res=>{ 
                      this.gravatarUrl = res["setMail"];
                      this.messages = res["messages"];
                    
                      //si aucun message n'a ete poste res["messages"] vaut undefined il faut donc affecter une liste vide 
                      if(this.messages === undefined)
                        this.messages = [];

                      if(this.gravatarUrl === undefined){
                        this.gravatarUrl = [];
                      }
                     });
  }

  updateMessages(funcSuccess, funcErr){
    //Si la liste de messages est vide on update en recuperant tout les messages
    if( !Array.isArray(this.messages) || !this.messages.length )
      this.poolservice.getAllMessage(this.idPool, localStorage.getItem("login"), localStorage.getItem("token"))
      .subscribe( funcSuccess, funcErr)
    else
      //Sinon on recupere tout les messages poster apres le dernier message courant
      this.poolservice
                                .getMessageFromId(this.idPool, localStorage.getItem("login"), localStorage.getItem("token"),
                                this.messages[this.messages.length-1]['_msgId']['$oid'])
                                .subscribe(
                                  funcSuccess,funcErr
                                )
  }

  public refresh(){
    this.updateMessages( this.successGetMessage, this.errorGetMessage );
  }

  successGetMessage = res => {
      if(res["status"] == "OK") {
        
        for (let msg of res["messages"]) {
          this.messages.push(msg);
        }
        
        for(let mail of res["setMail"]){
          if(this.gravatarUrl.find( x => ( x.login == mail.login ) ))
            this.gravatarUrl.push(mail);
        }
      }else{
        var redir = res['redictLogin'];
        if(redir){
          localStorage.clear();
          window.alert("You have been disconnected\n Please log in again");
          this.routeur.navigate(['login']);
        }
        this.messages = [];
        this.gravatarUrl = [];
      }
  };

  errorGetMessage = e => {
      console.log(e);
  }

  clearInput(){
    this.textInput.reset();
    
  }

  isAuthor(msg){
    return msg.gamblerLogin == localStorage.getItem("login");
  }

  findGravatar(login){
    let r = this.gravatarUrl.find(obj => {
      return obj.login == login;
    });
    if(r !== undefined)
      return r.gravatarUrl;
    return "https://www.gravatar.com/avatar/";
  }

  sendMessage(){
    if(!this.textInput.valid || (this.textInput.value).trim() == '' )
      return;
    let currentValue =this.textInput.value;
    this.textInput.reset();

    this.loading=true;
    this.poolservice.sendMessage(this.idPool, localStorage.getItem("login"), encodeURIComponent(currentValue), localStorage.getItem("token"))
                    .subscribe(
                      res => {
                          this.loading=false;
                          // On met a jour la vue en faisant une requete au serveur pour récup le message envoyé + les eventuels messages recu entre temps
                          if(res["status"] == "OK"){
                            this.updateMessages( this.successGetMessage, this.errorGetMessage
                          );
                          }else{
                            var redir = res['redictLogin'];
                            if(redir){
                              localStorage.clear();
                              window.alert("You have been disconnected\n Please log in again");
                              this.routeur.navigate(['login']);
                            }
                          }
                      },
                      err =>{
                        this.loading=false;
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
                        else{
                          var redir = res['redictLogin'];
                          if(redir){
                            localStorage.clear();
                            window.alert("You have been disconnected\n Please log in again");
                            this.routeur.navigate(['login']);
                          }
                        }
                      },
                      e=>{
                          console.log(e)
                      });

  }

}
