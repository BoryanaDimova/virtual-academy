import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {FormValidators} from '../../../core/validators/form.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy{

  form: FormGroup;
  fieldTextType: boolean;
  errorMessage: string;

  destroy$ = new Subject<boolean>();

   constructor(private fb: FormBuilder,
               private router: Router, private authService: AuthenticationService) {
   }

   ngOnInit(): void {
     this.buildForm();
   }

   ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

   onSubmit(): void{
     const email = this.form.controls.email.value;
     const password = this.form.controls.password.value;

     this.authService.login(email, password).pipe(
       takeUntil(this.destroy$)
     ).subscribe(response => {
       if (response.isBlocked){
         this.errorMessage = 'This user has been blocked. Please contact your administrator for more information.';
         return;
       }

       this.authService.setLoggedUser(response);
       this.router.navigate(['courses/courses-cards-list']);
     });
   }

  private buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, FormValidators.passwordPatternValidator()])]
    });
  }

  togglePass(): void {
    this.fieldTextType = !this.fieldTextType;
  }
}
