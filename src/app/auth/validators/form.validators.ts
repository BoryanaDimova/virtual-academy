import { ValidatorFn, AbstractControl } from '@angular/forms';

export class FormValidators {
  static patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  static MatchPassword(value: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any} | null => {
      return value !== control.value ? {passwordMismatch: true} : null;
    };
  }
}
