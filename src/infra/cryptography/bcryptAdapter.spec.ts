import bcrypt from 'bcrypt';

import { BcryptAdapter } from './bcryptAdapter';

const makeSut = (): BcryptAdapter => new BcryptAdapter();

describe('Bcrypt Adapter', () => {
  it('must call bcrypt with correct values', async () => {
    const suit = makeSut();

    const toHashValue = 'anyValue';

    const hashedValue = await suit.encrypt(toHashValue);

    const isEqual = await bcrypt.compare(toHashValue, hashedValue);

    expect(isEqual).toEqual(true);
  });
});
