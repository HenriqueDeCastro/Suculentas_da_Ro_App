/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FiltroNomeService } from './FiltroNome.service';

describe('Service: FiltroNome', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltroNomeService]
    });
  });

  it('should ...', inject([FiltroNomeService], (service: FiltroNomeService) => {
    expect(service).toBeTruthy();
  }));
});