import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportN12Component } from './report-n12.component';

describe('ReportN12Component', () => {
  let component: ReportN12Component;
  let fixture: ComponentFixture<ReportN12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportN12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportN12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
