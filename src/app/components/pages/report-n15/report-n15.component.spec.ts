import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportN15Component } from './report-n15.component';

describe('ReportN15Component', () => {
  let component: ReportN15Component;
  let fixture: ComponentFixture<ReportN15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportN15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportN15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
