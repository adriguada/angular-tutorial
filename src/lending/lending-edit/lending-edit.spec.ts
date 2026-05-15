import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingEdit } from './lending-edit';

describe('LendingEdit', () => {
  let component: LendingEdit;
  let fixture: ComponentFixture<LendingEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LendingEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(LendingEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
