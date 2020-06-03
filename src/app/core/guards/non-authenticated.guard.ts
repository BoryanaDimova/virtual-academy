import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthenticationService} from '../../auth/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthenticatedGuard implements CanLoad {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canLoad(): boolean {
    const user = this.authService.getLoggedUser();
    if (user) {
      this.router.navigate(['home']);

      return false;
    }

    return true;
  }
}
