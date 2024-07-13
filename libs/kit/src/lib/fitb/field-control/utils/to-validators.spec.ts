import { FITBFieldControlValidators } from '../field.control.types';
import { toValidators } from './to-validators';

const validators: Record<
  FITBFieldControlValidators['type'],
  FITBFieldControlValidators
> = {
  required: {
    type: 'required',
  },
  pattern: {
    type: 'pattern',
    pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0]{2,}$',
  },
  minLength: {
    type: 'minLength',
    minLength: 5,
  },
  email: {
    type: 'email',
  },
};

describe('toValidators', () => {
  it('should return an Angular Validator for each FITBFieldControlValidators', () => {
    const result = toValidators(Object.values(validators));
    expect(result.length).toBe(Object.keys(validators).length);
  });
});
