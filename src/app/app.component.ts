import {Component, OnInit} from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import {UserService} from './user-service.service';

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

  constructor(private userservice : UserService, private authguard : AuthGuardService) { }
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
  }
  public updateSolde(){
    if(localStorage.getItem("login")!=null && localStorage.getItem("token")!=null){
      this.userservice.infoUser(localStorage.getItem('login'), localStorage.getItem('token'))
        .subscribe(  res  => {
          if ( res['status'] === 'KO' ) {
            this.result = res['errorMessage'];
          } else {
            this.solde = res['solde'];
          }
        });
    }
  }

}
