import {Component, OnInit} from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import {UserService} from './user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'betcoinclient';
  logoURL = './assets/img/betcoin_logo.png';
  solde;
  result;
  myLogin;

  constructor(private userservice : UserService, private authguard : AuthGuardService, private routeur : Router) {
    routeur.events.subscribe(val => {this.updateSolde(); this.myLogin = localStorage.getItem("login")});
  }
  moveSide() {
    const divSidebar = document.getElementById('sidebar');
    if ( divSidebar.style.left === '0px' ) {
      divSidebar.style.left = '-200px';
    } else {
      divSidebar.style.left = '0px';
    }
  }

  ngOnInit(){
    this.updateSolde();
    this.myLogin = localStorage.getItem("login");

  }
  public updateSolde(){
    if(localStorage.getItem("login")!=null && localStorage.getItem("token")!=null){
      this.userservice.infoUser(localStorage.getItem('login'), localStorage.getItem('token'))
        .subscribe(  res  => {
          if ( res['status'] === 'KO' ) {
            this.result = res['errorMessage'];
            var redir = res['redictLogin'];
            console.log(res);
            if(redir){
              localStorage.clear();
              window.alert("You have been disconnected\n Please log in again");
              this.routeur.navigate(['login']);
            }
          } else {
            this.solde = res['solde'];
          }
        });
    }
  }

  isConnected(){
    return this.authguard.isConnected();
  }
}
