import { getRandomId } from './utils';

describe('Utils', () => {
  it('should two random id not equal and type verification', () => {
    const a = getRandomId();
    const b = getRandomId();

    expect(typeof a).toEqual('number');
    expect(typeof b).toEqual('number');
    expect(a).not.toEqual(b);
  });
});