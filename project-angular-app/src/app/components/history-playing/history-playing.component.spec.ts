import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPlayingComponent } from './history-playing.component';

describe('HistoryPlayingComponent', () => {
  let component: HistoryPlayingComponent;
  let fixture: ComponentFixture<HistoryPlayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPlayingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
