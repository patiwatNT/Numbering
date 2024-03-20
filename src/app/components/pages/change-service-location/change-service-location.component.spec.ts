import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeServiceLocationComponent } from './change-service-location.component';

describe('ChangeServiceLocationComponent', () => {
  let component: ChangeServiceLocationComponent;
  let fixture: ComponentFixture<ChangeServiceLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeServiceLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeServiceLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
