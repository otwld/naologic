import { FITBData } from '../fitb.types';

/**
 * Represents a required validation rule
 */
export type FITBFieldControlValidatorRequired = {
  type: 'required';
};

export type FITBFieldControlValidatorEmail = {
  type: 'email';
};

/**
 * Represents a regex validation rule
 */
export type FITBFieldControlValidatorPattern = {
  type: 'pattern';
  pattern: string;
};

export type FITBFieldControlValidatorMinLength = {
  type: 'minLength';
  minLength: number;
};

/**
 * A Field Control Validator represents a validation rule that is applied to a Control
 */
export type FITBFieldControlValidators =
  | FITBFieldControlValidatorRequired
  | FITBFieldControlValidatorPattern
  | FITBFieldControlValidatorMinLength
  | FITBFieldControlValidatorEmail;

/**
 * A Field Control is associated with a Control in the form, it has validators and can have children nodes
 * that are displayed conditionally based on the value of the control.
 */
export type FITBFieldControl = {
  type: 'fieldControl';
  formDataPointer: string;
  validators: FITBFieldControlValidators[];
  nodes?: FITBFieldControlNode[];
};

/**
 * A Field Control Node is a node that is displayed conditionally using the filter.
 */
export type FITBFieldControlNode = {
  filter: FITBFieldControlNodeFilter;
  children: FITBData;
};

export type FITBFieldControlNodeFilter = {
  $in: string[];
};
