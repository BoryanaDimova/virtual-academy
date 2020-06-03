import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-field-error-message',
  templateUrl: './field-error-message.component.html',
  styleUrls: ['./field-error-message.component.scss']
})
export class FieldErrorMessageComponent {
  @Input() control: AbstractControl;

  constructor() {
  }

  get errorMessage(): string {
    if (!this.control || !this.control.errors) {
      return;
    }

    for (const propName in this.control.errors) {
      if (this.control.touched && this.control.errors.hasOwnProperty(propName)) {
        const errors = this.control.errors;

        if (errors.required) {
          return 'This field is required. Please add a value.';
        }

        if (errors.minlength) {
          return `
            This field includes ${errors.minlength.actualLength} characters.
            This field should contain at least ${errors.minlength.requiredLength} characters.
          `;
        }

        if (errors.passwordMismatch) {
          return 'Passwords are different';
        }
      }
    }
  }
}
