import { TestBed } from '@angular/core/testing';

import { SymptomDataService } from './symptom-data.service';

describe('SymptomDataService', () => {
  let service: SymptomDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymptomDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
