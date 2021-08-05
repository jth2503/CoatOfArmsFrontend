import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTermDialogComponent } from './create-new-term-dialog.component';

describe('CreateNewTermDialogComponent', () => {
  let component: CreateNewTermDialogComponent;
  let fixture: ComponentFixture<CreateNewTermDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewTermDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTermDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
