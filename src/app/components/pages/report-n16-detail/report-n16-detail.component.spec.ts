import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportN16DetailComponent } from './report-n16-detail.component';

describe('ReportN16DetailComponent', () => {
  let component: ReportN16DetailComponent;
  let fixture: ComponentFixture<ReportN16DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportN16DetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportN16DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
