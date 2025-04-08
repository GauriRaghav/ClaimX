import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitnessInfoComponent } from './witness-info.component';

describe('WitnessInfoComponent', () => {
  let component: WitnessInfoComponent;
  let fixture: ComponentFixture<WitnessInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WitnessInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitnessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
