/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RenomearArquivoService } from './RenomearArquivo.service';

describe('Service: RenomearArquivo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenomearArquivoService]
    });
  });

  it('should ...', inject([RenomearArquivoService], (service: RenomearArquivoService) => {
    expect(service).toBeTruthy();
  }));
});
