import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IssamComponent } from './issam.component';

describe('IssamComponent', () => {
  let component: IssamComponent;
  let fixture: ComponentFixture<IssamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IssamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
