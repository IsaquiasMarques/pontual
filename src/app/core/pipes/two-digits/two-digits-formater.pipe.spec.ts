import { TwoDigitsFormaterPipe } from './two-digits-formater.pipe';

describe('TwoDigitsFormaterPipe', () => {
  it('create an instance', () => {
    const pipe = new TwoDigitsFormaterPipe();
    expect(pipe).toBeTruthy();
  });
});
