import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgElementsWpWebPartComponent } from './ng-elements-wp-web-part.component';

describe('NgElementsWpWebPartComponent', () => {
  let component: NgElementsWpWebPartComponent;
  let fixture: ComponentFixture<NgElementsWpWebPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgElementsWpWebPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgElementsWpWebPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
