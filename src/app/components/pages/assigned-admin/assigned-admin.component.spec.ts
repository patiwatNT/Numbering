import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedAdminComponent } from './assigned-admin.component';

describe('AssignedAdminComponent', () => {
  let component: AssignedAdminComponent;
  let fixture: ComponentFixture<AssignedAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
