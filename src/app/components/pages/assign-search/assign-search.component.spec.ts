import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSearchComponent } from './assign-search.component';

describe('AssignSearchComponent', () => {
  let component: AssignSearchComponent;
  let fixture: ComponentFixture<AssignSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
