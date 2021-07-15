import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermeditorTermcontainerComponent } from './termeditor-termcontainer.component';

describe('TermeditorTermcontainerComponent', () => {
  let component: TermeditorTermcontainerComponent;
  let fixture: ComponentFixture<TermeditorTermcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermeditorTermcontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermeditorTermcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
