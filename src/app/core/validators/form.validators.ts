import {ValidatorFn, AbstractControl} from '@angular/forms';

export class FormValidators {
  static passwordPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : {invalidPassword: true};
    };
  }

  static MatchPassword(value: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return value !== control.value ? {passwordMismatch: true} : null;
    };
  }

  static namePatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[a-zA-Z\s]+$');
      const valid = regex.test(control.value);
      return valid ? null : {invalidName: true};
    };
  }
}
