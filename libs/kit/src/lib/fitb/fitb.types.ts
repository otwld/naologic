import { FITBFieldControl } from './field-control/field.control.types';

export type FITBConfig = {
  formConfig: FITBFormConfig;
  data: FITBData;
};

export type FITBFormConfig = Record<string, FITBForm>;
export type FITBDataTypes = FITBText | FITBFieldControl;
export type FITBData = Array<FITBDataTypes>;

export type FITBFormInput = {
  placeholder: string;
  default: unknown;
  type: 'input';
};

/**
 * A select with options component
 */
export type FITBFormSelectWithOptions = {
  placeholder: string;
  default: unknown;
  options: Array<{ name: string; value: string }>;
  type: 'select-with-options';
};

/**
 * The possible components that FITB can render
 */
export type FITBForm = FITBFormInput | FITBFormSelectWithOptions;

/**
 * Represent a text element
 */
export type FITBText = {
  type: 'text';
  data: string;
};
