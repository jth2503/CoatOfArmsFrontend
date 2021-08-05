import { TestBed } from '@angular/core/testing';

import { TermeditorBackendServiceService } from './termeditor-backend-service.service';

describe('TermeditorBackendServiceService', () => {
  let service: TermeditorBackendServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermeditorBackendServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
