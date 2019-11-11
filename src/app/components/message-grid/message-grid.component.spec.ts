import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageGridComponent } from './message-grid.component';

describe('MessageGridComponent', () => {
  let component: MessageGridComponent;
  let fixture: ComponentFixture<MessageGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
