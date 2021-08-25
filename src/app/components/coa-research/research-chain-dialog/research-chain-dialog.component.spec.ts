import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchChainDialogComponent } from './research-chain-dialog.component';

describe('ResearchChainDialogComponent', () => {
  let component: ResearchChainDialogComponent;
  let fixture: ComponentFixture<ResearchChainDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchChainDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchChainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
