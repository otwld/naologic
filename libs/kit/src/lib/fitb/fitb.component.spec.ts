import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FITBComponent } from './fitb.component';

describe('FitbComponent', () => {
  let component: FITBComponent;
  let fixture: ComponentFixture<FITBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FITBComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FITBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
