import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { FITBService } from '../fitb.service';
import {
  FITBFieldControl,
  FITBFieldControlNode,
  FITBFieldControlValidators,
} from './field.control.types';
import { FITBData } from '../fitb.types';
import { toValidators } from './utils/to-validators';
import { startWith, Subscription } from 'rxjs';

@Injectable()
/**
 * The FieldControlService is responsible for managing the FieldControl data and view model,
 * and adding/removing validators to the form control. It also subscribes to the value changes
 * of the form control when it has nodes to determine the children to render.
 */
export class FieldControlService implements OnDestroy {
  /**
   * The FITBService instance.
   * @private
   */
  private readonly fitbService = inject(FITBService);
  /**
   * The subscription to the control value changes.
   * @private
   */
  private controlValueChangesSubscription: Subscription | null = null;

  /**
   * The data of the field control.
   */
  public readonly data = signal<FITBFieldControl | null>(null);
  /**
   * The error message to display.
   */
  public readonly errorMessage = signal<string | null>(null);
  /**
   * The view model of the field control.
   */
  public readonly vm = computed(() => {
    const data = this.data();
    if (!data) return null;
    const control = this.fitbService.getControl(data.formDataPointer);
    const formConfig = this.fitbService.getControlConfig(data.formDataPointer);
    if (!control || !formConfig) return null;
    return {
      control,
      formConfig,
    };
  });

  /**
   * The children to render based on the form value and the nodes filter.
   */
  public readonly renderedChildren = signal<FITBData>([]);

  /**
   * Initialize the FieldControlService with the given data, add the validators to the form control.
   * If the FieldControl has nodes, subscribe to the value changes and apply the filter.
   * @param {FITBFieldControl} data - The data to initialize the service with.
   */
  public init(data: FITBFieldControl) {
    const { validators, formDataPointer, nodes } = data;
    try {
      this.addValidators(formDataPointer, validators);
      console.info('FieldControlService initialized with', data);

      const control = this.fitbService.getControl(formDataPointer);

      if (nodes?.length) {
        console.info('Subscribing to control value changes');
        this.controlValueChangesSubscription = control.valueChanges
          .pipe(startWith(control.value))
          .subscribe((value) => {
            this.setRenderedChildren(value, nodes);
          });
      }

      this.data.set(data);
    } catch (error) {
      this.errorMessage.set(
        `Error initializing FieldControlService for form: ${formDataPointer}. Please check the console for more information.`
      );
      console.error('FieldControlService initialization error', error);
    }
  }

  /**
   * Add validators to the form control.
   * @param {string} formDataPointer - The pointer to the form data.
   * @param {FITBFieldControlValidators[]} validators - The validators to add.
   */
  public addValidators(
    formDataPointer: string,
    validators: FITBFieldControlValidators[]
  ) {
    const control = this.fitbService.getControl(formDataPointer);
    if (!control)
      throw new Error('[FITBService] addValidators: Control not found');
    control.addValidators(toValidators(validators));
    control.updateValueAndValidity();
    console.info(
      `[FITBService] Validators added to (${formDataPointer})`,
      validators
    );
    console.info(this.fitbService.form);
  }

  /**
   * Remove the added validators from the form control.
   * @param {string} formDataPointer - The pointer to the form data.
   * @param {FITBFieldControlValidators[]} [validators] - The validators to remove. If not provided, all validators are removed.
   */
  public removeValidators(
    formDataPointer: string,
    validators?: FITBFieldControlValidators[]
  ) {
    try {
      const control = this.fitbService.getControl(formDataPointer);
      if (validators) control.removeValidators(toValidators(validators));
      else control.clearValidators();
      control.updateValueAndValidity();
      console.info(
        `[FITBService] Validators removed from (${formDataPointer})`
      );
    } catch (e) {
      return;
    }
  }

  /**
   * Set the rendered children based on the value of the form control and the nodes filter.
   * @param {*} value - The current value of the form control.
   * @param {FITBFieldControlNode[]} nodes - The nodes to filter and render.
   * @private
   *
   * TODO: This method is too complex and should be refactored..
   */
  // TODO: Remove the usage of any type (need to implement Template Generics)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setRenderedChildren(value: any, nodes: FITBFieldControlNode[]) {
    const previousValue = this.renderedChildren();
    // Find the nodes that match the value
    const filteredNodes = nodes.find((node) => node.filter.$in.includes(value));
    // Reset the controls that are not in the new children
    if (previousValue) {
      const toReset = previousValue.filter(
        (node) => !filteredNodes?.children?.includes(node)
      );
      toReset.forEach((node) => {
        if (node.type === 'fieldControl')
          this.fitbService.resetControl(node.formDataPointer);
      });
    }
    this.renderedChildren.set(filteredNodes?.children ?? []);
  }

  /**
   * Lifecycle hook to clean up subscriptions and remove validators when the service is destroyed.
   */
  ngOnDestroy() {
    console.info('FieldControlService destroyed');
    const data = this.data();
    // Unsubscribe from the value changes
    if (this.controlValueChangesSubscription) {
      this.controlValueChangesSubscription.unsubscribe();
    }
    if (!data) return;
    const { validators, formDataPointer } = data;
    // Remove the added validators
    this.removeValidators(formDataPointer, validators);
  }
}
