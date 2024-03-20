import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportN16Component } from './report-n16.component';

describe('ReportN16Component', () => {
  let component: ReportN16Component;
  let fixture: ComponentFixture<ReportN16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportN16Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportN16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
