import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy{

  form: FormGroup;
  fieldTextType: boolean;

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
         // add error message
         return;
       }

       this.authService.setLoggedUser(response);
       this.router.navigate(['courses/courses-cards-list']);
     });
   }

  private buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePass(): void {
    this.fieldTextType = !this.fieldTextType;
  }
}
