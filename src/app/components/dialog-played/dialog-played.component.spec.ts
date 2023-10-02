import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlayedComponent } from './dialog-played.component';

describe('DialogPlayedComponent', () => {
  let component: DialogPlayedComponent;
  let fixture: ComponentFixture<DialogPlayedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPlayedComponent]
    });
    fixture = TestBed.createComponent(DialogPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
