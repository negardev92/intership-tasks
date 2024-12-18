import { TestBed } from '@angular/core/testing';

import { GetApiProdcutsService } from './get-api-prodcuts.service';

describe('GetApiProdcutsService', () => {
  let service: GetApiProdcutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetApiProdcutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
