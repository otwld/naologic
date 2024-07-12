import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FITBService } from './fitb.service';
import { FITBData, FITBFormConfig } from './fitb.types';
import { FieldControlComponent } from './field-control/field-control.component';
import { filter } from 'rxjs';

@Component({
  selector: 'lib-fitb',
  standalone: true,
  imports: [CommonModule, FieldControlComponent],
  templateUrl: './fitb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FITBService],
})
export class FITBComponent implements OnChanges {
  /**
   * The FITBService instance
   */
  public readonly service = inject(FITBService);
  /**
   * The Form's controls configuration
   */
  public readonly formConfig = input.required<FITBFormConfig>();
  /**
   * The data to be rendered
   */
  public readonly data = input.required<FITBData>();
  /**
   * Emit when the form is valid
   */
  @Output()
  public readonly formOutput = this.service.form.valueChanges.pipe(
    filter(() => this.service.form.valid)
  );

  ngOnChanges() {
    this.service.init(this.formConfig(), this.data());
  }
}
