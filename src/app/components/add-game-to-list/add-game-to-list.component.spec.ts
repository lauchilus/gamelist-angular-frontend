import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameToListComponent } from './add-game-to-list.component';

describe('AddGameToListComponent', () => {
  let component: AddGameToListComponent;
  let fixture: ComponentFixture<AddGameToListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGameToListComponent]
    });
    fixture = TestBed.createComponent(AddGameToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
