import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTravelComponent } from './home-travel.component';

describe('HomeTravelComponent', () => {
  let component: HomeTravelComponent;
  let fixture: ComponentFixture<HomeTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTravelComponent]
    });
    fixture = TestBed.createComponent(HomeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
