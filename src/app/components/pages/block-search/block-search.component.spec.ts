import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSearchComponent } from './block-search.component';

describe('BlockSearchComponent', () => {
  let component: BlockSearchComponent;
  let fixture: ComponentFixture<BlockSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
