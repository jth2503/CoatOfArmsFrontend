import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermCardSelectionComponent } from './term-card-selection.component';

describe('TermCardSelectionComponent', () => {
  let component: TermCardSelectionComponent;
  let fixture: ComponentFixture<TermCardSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermCardSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermCardSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
