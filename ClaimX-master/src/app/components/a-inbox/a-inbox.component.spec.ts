import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AInboxComponent } from './a-inbox.component';

describe('AInboxComponent', () => {
  let component: AInboxComponent;
  let fixture: ComponentFixture<AInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AInboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
