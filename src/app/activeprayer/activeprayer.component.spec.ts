import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveprayerComponent } from './activeprayer.component';

describe('ActiveprayerComponent', () => {
  let component: ActiveprayerComponent;
  let fixture: ComponentFixture<ActiveprayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveprayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveprayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
