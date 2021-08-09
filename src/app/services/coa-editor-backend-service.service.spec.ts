import { TestBed } from '@angular/core/testing';

import { CoaEditorBackendServiceService } from './coa-editor-backend-service.service';

describe('CoaEditorBackendServiceService', () => {
  let service: CoaEditorBackendServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoaEditorBackendServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
