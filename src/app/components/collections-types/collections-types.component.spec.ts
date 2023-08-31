import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsTypesComponent } from './collections-types.component';

describe('CollectionsTypesComponent', () => {
  let component: CollectionsTypesComponent;
  let fixture: ComponentFixture<CollectionsTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsTypesComponent]
    });
    fixture = TestBed.createComponent(CollectionsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
