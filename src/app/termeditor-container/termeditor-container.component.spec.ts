import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermeditorContainerComponent } from './termeditor-container.component';

describe('TermeditorContainerComponent', () => {
  let component: TermeditorContainerComponent;
  let fixture: ComponentFixture<TermeditorContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermeditorContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermeditorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
