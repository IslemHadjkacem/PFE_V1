import { TestBed } from '@angular/core/testing';

import { FormDynamicService } from './form-dynamic.service';

describe('FormDynamicService', () => {
  let service: FormDynamicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDynamicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
