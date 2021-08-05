import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTermRelationshipDialogComponent } from './add-term-relationship-dialog.component';

describe('AddTermRelationshipDialogComponent', () => {
  let component: AddTermRelationshipDialogComponent;
  let fixture: ComponentFixture<AddTermRelationshipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTermRelationshipDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTermRelationshipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
