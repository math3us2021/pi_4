import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHoursComponent } from './card-hours.component';

describe('CardHoursComponent', () => {
  let component: CardHoursComponent;
  let fixture: ComponentFixture<CardHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
