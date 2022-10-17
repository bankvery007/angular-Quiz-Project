import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfiedComponent } from './satisfied.component';

describe('SatisfiedComponent', () => {
  let component: SatisfiedComponent;
  let fixture: ComponentFixture<SatisfiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatisfiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
