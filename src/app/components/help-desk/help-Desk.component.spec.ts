import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDeskComponent } from './help-Desk.component';

describe('helpDeskComponent', () => {
  let component: HelpDeskComponent;
  let fixture: ComponentFixture<HelpDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpDeskComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
