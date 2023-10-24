import { reverse } from '../utils/for_testing';

describe.skip('reverse', () => {
  test('of "a"', () => {
    const result = reverse('a');

    expect(result).toBe('a');
  });

  test('of "react"', () => {
    const result = reverse('react');

    expect(result).toBe('tcaer');
  });

  test('of "releveler"', () => {
    const result = reverse('releveler');

    expect(result).toBe('releveler');
  });
});
