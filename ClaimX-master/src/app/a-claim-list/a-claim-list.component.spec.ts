import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AClaimListComponent } from './a-claim-list.component';

describe('AClaimListComponent', () => {
  let component: AClaimListComponent;
  let fixture: ComponentFixture<AClaimListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AClaimListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AClaimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
