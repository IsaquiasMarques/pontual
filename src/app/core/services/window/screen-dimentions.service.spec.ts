import { TestBed } from '@angular/core/testing';

import { ScreenDimentions } from './screen-dimentions.service';

describe('ScreenDimentionsService', () => {
  let service: ScreenDimentions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenDimentions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
