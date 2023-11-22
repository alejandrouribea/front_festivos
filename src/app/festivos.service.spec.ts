import { TestBed } from '@angular/core/testing';

import { festivosService } from './festivos.service';

describe('festivosService', () => {
  let service: festivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(festivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
