import { TestBed } from '@angular/core/testing';

import { ApiGetUserService } from './api-get-user.service';

describe('ApiGetUserService', () => {
  let service: ApiGetUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGetUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
