import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../core/models/user.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthenticationService} from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-user-reactive-form',
  templateUrl: './user-reactive-form.component.html',
  styleUrls: ['./user-reactive-form.component.scss']
})
export class UserReactiveFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  editable: boolean;
  user: User;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedUser();
    if (!this.user) {
      return;
    }

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    this.editable = !this.editable;
    const userData = this.formGroup.value;

    this.userService.saveUser(userData).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.authService.setLoggedUser(response);
      this.user = this.authService.getLoggedUser();
    });
  }

  private buildForm(): void {

    this.formGroup = this.fb.group({
      id: [this.user.id],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email],
      password: [this.user.password],
      isBlocked: [this.user.isBlocked],
      isAdmin: [this.user.isAdmin]
    });
  }
}
