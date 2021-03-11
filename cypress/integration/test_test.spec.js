import { generateHelloWorld } from '../../index';

describe('Hello World Test', () => {
  it('Hello world equals Hello World', () => {
    expect('Hello World').to.equal('Hello World');
  });
  it('My function also equals Hello World', () => {
    expect(generateHelloWorld('foobar')).to.equal('raboof!');
  })
});
