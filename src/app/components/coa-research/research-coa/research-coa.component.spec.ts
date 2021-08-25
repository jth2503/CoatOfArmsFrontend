import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchCoaComponent } from './research-coa.component';

describe('ResearchCoaComponent', () => {
  let component: ResearchCoaComponent;
  let fixture: ComponentFixture<ResearchCoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchCoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchCoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
