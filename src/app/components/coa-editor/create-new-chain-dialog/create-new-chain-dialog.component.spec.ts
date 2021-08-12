import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewChainDialogComponent } from './create-new-chain-dialog.component';

describe('CreateNewChainDialogComponent', () => {
  let component: CreateNewChainDialogComponent;
  let fixture: ComponentFixture<CreateNewChainDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewChainDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewChainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
