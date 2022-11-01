import { TestBed } from '@angular/core/testing';

import { ProfilemodalService } from './profilemodal.service';

describe('ProfilemodalService', () => {
  let service: ProfilemodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilemodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
