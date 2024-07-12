import { Validators } from '@angular/forms';
import { FITBFieldControlValidators } from '../field.control.types';

export function toValidators(validators: FITBFieldControlValidators[]) {
  return validators.map((validator) => {
    switch (validator.type) {
      case 'required':
        return Validators.required;
      case 'pattern':
        return Validators.pattern(validator.pattern);
      case 'minLength':
        return Validators.minLength(validator.minLength);
      case 'email':
        return Validators.email;
      default:
        throw new Error(`[FITBService] Unknown validator ${validator}`);
    }
  });
}
