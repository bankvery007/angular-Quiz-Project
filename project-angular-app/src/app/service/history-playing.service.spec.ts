import { TestBed } from '@angular/core/testing';

import { HistoryPlayingService } from './history-playing.service';

describe('HistoryPlayingService', () => {
  let service: HistoryPlayingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryPlayingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
