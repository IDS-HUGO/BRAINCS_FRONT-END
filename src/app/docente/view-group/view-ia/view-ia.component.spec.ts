import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIAComponent } from './view-ia.component';

describe('ViewIAComponent', () => {
  let component: ViewIAComponent;
  let fixture: ComponentFixture<ViewIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewIAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
