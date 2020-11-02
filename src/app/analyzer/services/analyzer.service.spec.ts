/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnalyzerService } from './analyzer.service';

describe('Service: Analyzer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyzerService]
    });
  });

  it('should ...', inject([AnalyzerService], (service: AnalyzerService) => {
    expect(service).toBeTruthy();
  }));
});
