import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWorksComponent } from './modal-works.component';

describe('ModalWorksComponent', () => {
  let component: ModalWorksComponent;
  let fixture: ComponentFixture<ModalWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWorksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
