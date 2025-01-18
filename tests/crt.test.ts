import { chineseRemainderTheorem } from '../src/crt';

test('chineseRemainderTheorem should return correct result', () => {
    const result = chineseRemainderTheorem([2, 3, 2], [3, 5, 7]);
    expect(result).toBe(23);
});

test('chineseRemainderTheorem should handle negative result', () => {
    const result = chineseRemainderTheorem([1, 2, 3], [3, 4, 5]);
    expect(result).toBe(58);
});

test('chineseRemainderTheorem should throw error for mismatched array lengths', () => {
    expect(() => chineseRemainderTheorem([2, 3], [3, 5, 7])).toThrow('Remainders and moduli arrays must have the same length');
});

test('chineseRemainderTheorem should throw error for non-integer inputs', () => {
    expect(() => chineseRemainderTheorem([2.5, 3], [3, 5])).toThrow('Remainders and moduli must be integers');
});

test('chineseRemainderTheorem should throw error for non-positive moduli', () => {
    expect(() => chineseRemainderTheorem([2, 3], [3, -5])).toThrow('Moduli must be positive');
});