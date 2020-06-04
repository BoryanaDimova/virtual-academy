import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Router} from '@angular/router';
import {AuthenticationService} from '../../auth/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canLoad(): boolean {
    const user = this.authService.getLoggedUser();
    if (!user) {
      this.router.navigate(['auth/login']);

      return false;
    }

    return true;
  }

  canActivate(): boolean {
    const user = this.authService.getLoggedUser();
    if (!user) {
      this.router.navigate(['auth/login']);

      return false;
    }

    if (!user.isAdmin) {
      this.router.navigate(['courses/courses-cards-list']);

      return false;
    }

    return true;
  }
}
