import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportN14Component } from './report-n14.component';

describe('ReportN14Component', () => {
  let component: ReportN14Component;
  let fixture: ComponentFixture<ReportN14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportN14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportN14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
