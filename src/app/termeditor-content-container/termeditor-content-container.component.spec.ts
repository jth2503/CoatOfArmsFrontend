import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermeditorContentContainerComponent } from './termeditor-content-container.component';

describe('TermeditorContentContainerComponent', () => {
  let component: TermeditorContentContainerComponent;
  let fixture: ComponentFixture<TermeditorContentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermeditorContentContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermeditorContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
