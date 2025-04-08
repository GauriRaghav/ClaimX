import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UNavbarComponent } from './u-navbar.component';

describe('UNavbarComponent', () => {
  let component: UNavbarComponent;
  let fixture: ComponentFixture<UNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
