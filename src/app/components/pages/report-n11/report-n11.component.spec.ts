import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportN11Component } from './report-n11.component';

describe('ReportN11Component', () => {
  let component: ReportN11Component;
  let fixture: ComponentFixture<ReportN11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportN11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportN11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
