import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldControlService } from './field-control.service';
import { InputComponent } from '../../controls/input/input.component';
import { SelectWithOptionsComponent } from '../../controls/select-with-options/select-with-options.component';
import { FITBFieldControl } from './field.control.types';

@Component({
  selector: 'lib-field-control',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    SelectWithOptionsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './field-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FieldControlService],
})
export class FieldControlComponent implements OnInit {
  public readonly service = inject(FieldControlService);

  public readonly data = input.required<FITBFieldControl>();

  ngOnInit() {
    this.service.init(this.data());
  }
}
