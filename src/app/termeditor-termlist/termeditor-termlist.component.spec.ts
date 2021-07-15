import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermeditorTermlistComponent } from './termeditor-termlist.component';

describe('TermeditorTermlistComponent', () => {
  let component: TermeditorTermlistComponent;
  let fixture: ComponentFixture<TermeditorTermlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermeditorTermlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermeditorTermlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
