import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FnolDetailsComponent } from './fnol-details.component';

describe('FnolDetailsComponent', () => {
  let component: FnolDetailsComponent;
  let fixture: ComponentFixture<FnolDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FnolDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FnolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
