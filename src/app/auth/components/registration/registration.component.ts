import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {FormValidators} from '../../validators/form.validators';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../../../core/models/user.interface';
import {Role} from '../../../core/models/role';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  passFieldTextType: boolean;
  confirmPassFieldTextType: boolean;
  destroy$ = new Subject<boolean>();
  errorMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    const user: User = this.form.value;

    if (!this.form.valid) {
      return;
    }
    // check if user with this email already exists
    this.authService.getUsers().pipe(
      map((response: User[]) => response.find(usr => usr.email === user.email)),
      takeUntil(this.destroy$)
    ).subscribe(userResponse => {
      if (userResponse) {
        this.errorMessage = 'Email has already been taken! Try another one!';
        return;
      }

      this.authService.register(user).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
        console.log(response);

        this.router.navigate(['auth/login']);
      });
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, FormValidators.patternValidator()])],
      confirmPassword: ['', [Validators.required, FormValidators.MatchPassword(this.form?.controls?.password.value)]],
      isBlocked: false,
      role: Role.User
    });
  }

  togglePass(): void {
    this.passFieldTextType = !this.passFieldTextType;
  }

  toggleConfirmPass(): void {
    this.confirmPassFieldTextType = !this.confirmPassFieldTextType;
  }
}
