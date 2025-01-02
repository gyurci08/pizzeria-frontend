import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSearchFieldComponent } from './pop-up-search-field.component';

describe('PopUpSearchFieldComponent', () => {
  let component: PopUpSearchFieldComponent;
  let fixture: ComponentFixture<PopUpSearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpSearchFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
