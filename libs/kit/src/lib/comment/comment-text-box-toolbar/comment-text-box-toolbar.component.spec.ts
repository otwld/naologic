import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentTextBoxToolbarComponent } from './comment-text-box-toolbar.component';

describe('CommentTextBoxToolbarComponent', () => {
  let component: CommentTextBoxToolbarComponent;
  let fixture: ComponentFixture<CommentTextBoxToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentTextBoxToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentTextBoxToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
