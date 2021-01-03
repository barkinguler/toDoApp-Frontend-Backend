import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstartComponent } from './workstart.component';

describe('WorkstartComponent', () => {
  let component: WorkstartComponent;
  let fixture: ComponentFixture<WorkstartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkstartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
