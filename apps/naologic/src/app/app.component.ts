import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
  untracked,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FITB_EXAMPLES,
  FITBComponent,
  isFITBExampleName,
  SelectWithOptionsComponent,
} from '@naologic/kit';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe, KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    SelectWithOptionsComponent,
    FITBComponent,
    JsonPipe,
    KeyValuePipe,
    NgTemplateOutlet,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /**
   * The form control for the select
   */
  public readonly control = new FormControl<string | null>(null);
  /**
   * The control value as a signal
   */
  public readonly controlValue = toSignal(this.control.valueChanges);
  /**
   * The options for the select
   */
  public readonly options = Object.keys(FITB_EXAMPLES).map((key) => {
    return { name: key, value: key };
  });
  /**
   * The selected example
   */
  public readonly selectedExample = computed(() => {
    const controlValue = this.controlValue();
    if (!controlValue) return null;
    if (!isFITBExampleName(controlValue)) return null;
    return FITB_EXAMPLES[controlValue];
  });

  public readonly formOutputValue = signal<any | null>(null);

  constructor() {
    effect(() => {
      this.selectedExample();
      untracked(() => {
        this.formOutputValue.set(null);
      });
    });
  }

  onFormChange(event: any) {
    console.log('Form Change', event);
    this.formOutputValue.set(event);
  }
}
