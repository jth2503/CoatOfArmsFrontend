import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaDetailsComponent } from './coa-details.component';

describe('CoaDetailsComponent', () => {
  let component: CoaDetailsComponent;
  let fixture: ComponentFixture<CoaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
