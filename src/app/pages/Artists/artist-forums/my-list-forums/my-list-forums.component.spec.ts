import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListForumsComponent } from './my-list-forums.component';

describe('MyListForumsComponent', () => {
  let component: MyListForumsComponent;
  let fixture: ComponentFixture<MyListForumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyListForumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyListForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
