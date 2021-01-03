import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDatesComponent } from './modal-dates.component';

describe('ModalDatesComponent', () => {
  let component: ModalDatesComponent;
  let fixture: ComponentFixture<ModalDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
