import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthenticationService} from '../../auth/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

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
}
