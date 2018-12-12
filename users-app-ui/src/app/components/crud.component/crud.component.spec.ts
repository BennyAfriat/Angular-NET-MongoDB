import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Crud.ComponentComponent } from './crud.component.component';

describe('Crud.ComponentComponent', () => {
  let component: Crud.ComponentComponent;
  let fixture: ComponentFixture<Crud.ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Crud.ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Crud.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
