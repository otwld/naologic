import { FieldControlService } from './field-control.service';
import { TestBed } from '@angular/core/testing';
import { FITB_EXAMPLES } from '../../constants/fitb-examples';
import { FITBService } from '../fitb.service';

const fieldControlWithNodes = FITB_EXAMPLES['Naologic widget'].data.find(
  (d) => d.type === 'fieldControl' && d.nodes
);

const config = FITB_EXAMPLES['Naologic widget'];

describe('FieldControlService', () => {
  let service: FieldControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldControlService, FITBService],
    });
    const fitbService = TestBed.inject(FITBService);
    fitbService.init(config.formConfig, config.data);
    service = TestBed.inject(FieldControlService);
    if (!fieldControlWithNodes || fieldControlWithNodes.type !== 'fieldControl')
      throw new Error('No fieldControl with nodes found in FITB_EXAMPLES');
    service.init(fieldControlWithNodes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
