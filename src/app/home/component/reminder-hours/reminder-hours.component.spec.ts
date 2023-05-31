import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderHoursComponent } from './reminder-hours.component';

describe('ReminderHoursComponent', () => {
  let component: ReminderHoursComponent;
  let fixture: ComponentFixture<ReminderHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
