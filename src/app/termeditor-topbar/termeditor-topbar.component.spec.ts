import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermeditorTopbarComponent } from './termeditor-topbar.component';

describe('TermeditorTopbarComponent', () => {
  let component: TermeditorTopbarComponent;
  let fixture: ComponentFixture<TermeditorTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermeditorTopbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermeditorTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
