import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FITBData, FITBFormConfig } from './fitb.types';

@Injectable()
/**
 * The FITB Service, responsible for managing the form and data
 * it provides methods to initialize the form, get the control, reset the control
 * and get the control config.
 */
export class FITBService {
  /**
   * The form builder instance
   * @private
   */
  private readonly formBuilder = inject(FormBuilder);
  /**
   * The form instance
   */
  public readonly form = this.formBuilder.group({});
  /**
   * The data to be rendered
   */
  public readonly data = signal<FITBData | null>(null);
  /**
   * The Form's controls configuration
   */
  public readonly formConfig = signal<FITBFormConfig | null>(null);

  /**
   * Initialize the service with the given config and data
   * if the form already has controls, they will be removed
   * and new controls will be created based on the given config
   * and the data will be set
   *
   * @param formConfig
   * @param data
   */
  public init(formConfig: FITBFormConfig, data: FITBData): void {
    console.info('[FITBService] Initializing with config', formConfig);

    Object.keys(this.form.controls).forEach((key) => {
      this.form.removeControl(key, { emitEvent: false });
    });

    this.setControls(formConfig);

    // TODO, should i improve this ? Do we really need Signals here ?
    this.formConfig.set(formConfig);
    this.data.set(data);
  }

  /**
   * Create and add the form controls based on the given config
   * @param config
   * @private
   */
  private setControls(config: FITBFormConfig) {
    Object.entries(config).forEach(([key, value]) => {
      this.form.addControl(key, new FormControl(value.default), {
        emitEvent: false,
      });
    });
  }

  /**
   * Get the control based on the given form data pointer
   * @param formDataPointer
   */
  public getControl(formDataPointer: string): FormControl {
    const control = this.form.get(formDataPointer);
    if (!control)
      throw new Error('[FITBService] getControl: Control not found');
    if (!(control instanceof FormControl))
      throw new Error('[FITBService] getControl: Control is not a FormControl');
    return control;
  }

  /**
   * Get the control config based on the given form data pointer
   * @param formDataPointer
   */
  public getControlConfig(formDataPointer: string) {
    const config = this.formConfig();
    return config ? config[formDataPointer] : null;
  }

  /**
   * Reset the control based on the given form data pointer
   * @param formDataPointer
   */
  public resetControl(formDataPointer: string) {
    console.info('[FITBService] Reset control', formDataPointer);
    const control = this.getControl(formDataPointer);
    if (!control)
      throw new Error('[FITBService] resetControl: Control not found');
    control.reset();
  }
}
