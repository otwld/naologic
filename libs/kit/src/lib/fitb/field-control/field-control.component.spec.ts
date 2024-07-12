import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldControlComponent } from './field-control.component';
import { FITBService } from '../fitb.service';
import { FITB_EXAMPLES } from '../../constants/fitb-examples';
import { FITBFieldControl } from './field.control.types';
import { FormControl } from '@angular/forms';

describe('FieldControlComponent', () => {
  let component: FieldControlComponent;
  let fixture: ComponentFixture<FieldControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldControlComponent],
      providers: [
        {
          provide: FITBService,
          useValue: {
            getControl: () => new FormControl(),
            getControlConfig: () => FITB_EXAMPLES['Naologic widget'].formConfig,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldControlComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      formDataPointer: 'name',
      type: 'fieldControl',
      validators: [],
    } satisfies FITBFieldControl);
    fixture.detectChanges();
  });

  it('should render text', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
