import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertCoaComponent } from './upsert-coa.component';

describe('UpsertCoaComponent', () => {
  let component: UpsertCoaComponent;
  let fixture: ComponentFixture<UpsertCoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertCoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertCoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
