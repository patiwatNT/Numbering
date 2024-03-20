import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportN13Component } from './report-n13.component';

describe('ReportN13Component', () => {
  let component: ReportN13Component;
  let fixture: ComponentFixture<ReportN13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportN13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportN13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
