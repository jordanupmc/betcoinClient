import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authservice : AuthService, private routeur: Router) { }

  ngOnInit() {
  }
  result;

  isConnect(){
    return !(localStorage.getItem("login") == null || localStorage.getItem("token") == null);
  }

  // TODO redirect to home on success ?
  onClick(){
    if(!this.isConnect())
      this.result = "You are not connected"
    else  
      this.authservice.logout(localStorage.getItem("login"), localStorage.getItem("token"))
                      .subscribe(
                        res => {
                          if(res['status'] == 'KO' ){
                            this.result = res['errorMessage'];
                          }
                          else{
                            this.result = "Logout success";
                            localStorage.removeItem("token");
                            localStorage.removeItem("login");
                            document.getElementById('out-ed').style.display = 'none';
                            document.getElementById('in-sub').style.display = 'inline-flex';
                            this.routeur.navigate(['chart']);
                          }
                        }
                      )
  }
}
