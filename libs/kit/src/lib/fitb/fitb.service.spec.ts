import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FITBService } from './fitb.service';
import { FITB_EXAMPLES } from '../constants/fitb-examples';

const data = FITB_EXAMPLES['Naologic widget'];

describe('FITBService', () => {
  let service: FITBService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FITBService, FormBuilder],
    });
    service = TestBed.inject(FITBService);
    service.init(data.formConfig, data.data);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be initialized', () => {
    expect(Object.keys(service.form.controls).length).toBe(
      Object.keys(data.formConfig).length
    );
  });

  it('should be able to reset a control', () => {
    const control = service.getControl('name');
    expect(control).toBeTruthy();
    control.setValue('John Doe');
    expect(control.value).toBe('John Doe');
    service.resetControl('name');
    expect(control.value).toBe(data.formConfig['name'].default);
  });

  it('should be able to get the control config', () => {
    const controlConfig = service.getControlConfig('name');
    expect(controlConfig).toBeTruthy();
  });
});
