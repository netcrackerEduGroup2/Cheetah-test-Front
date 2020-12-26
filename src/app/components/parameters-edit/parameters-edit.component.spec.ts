import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersEditComponent } from './parameters-edit.component';

describe('ParametersEditComponent', () => {
  let component: ParametersEditComponent;
  let fixture: ComponentFixture<ParametersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametersEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
