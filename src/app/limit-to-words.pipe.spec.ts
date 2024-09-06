import { LimitToWordsPipe } from './limit-to-words.pipe';

describe('LimitToWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitToWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
