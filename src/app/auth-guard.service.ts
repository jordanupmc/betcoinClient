import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /*  TODO a voir si on fait un check coté serveur
    if (this.userService.isValid()) {
      return true;
    }*/
    if (localStorage.getItem("token")) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
  isConnected(){
    return (localStorage.getItem("token")) ? true : false;
  }
}

