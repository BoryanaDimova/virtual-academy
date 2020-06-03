import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from './auth/services/authentication.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Virtual Academy';
  hasLoggedUser: boolean;

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkForLoggedUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.checkForLoggedUser();
    this.router.navigate(['auth/login']);
  }

  checkForLoggedUser() {
    this.authService.getHasLoggedIn().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => this.hasLoggedUser = response);
  }
}
