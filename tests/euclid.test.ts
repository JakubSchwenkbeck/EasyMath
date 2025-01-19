import { extendedEuclidean } from '../src/euclid';

test('extendedEuclidean should return correct GCD and coefficients', () => {
    const result = extendedEuclidean(56, 15);
    expect(result.gcd).toBe(1);
    expect(result.x).toBe(-4);
    expect(result.y).toBe(15);
});

test('extendedEuclidean should return correct GCD and coefficients', () => {
    const result = extendedEuclidean(60, 7);
    expect(result.gcd).toBe(1);
    expect(result.x).toBe(2);
    expect(result.y).toBe(-17);
});

test('extendedEuclidean should return correct GCD and coefficients with big numbers', () => {
    const result = extendedEuclidean(5611, 1523);
    expect(result.gcd).toBe(1);
    expect(result.x).toBe(-19);
    expect(result.y).toBe(70);
});
test('extendedEuclidean should return correct GCD and coefficients for multiples', () => {
    const result = extendedEuclidean(5600, 1400);
    expect(result.gcd).toBe(1400);
    expect(result.x).toBe(0);
    expect(result.y).toBe(1);
});

test('extendedEuclidean should return correct GCD and coefficients for multiples', () => {
    const result = extendedEuclidean(1400, 5600);
    expect(result.gcd).toBe(1400);
    expect(result.x).toBe(1);
    expect(result.y).toBe(0);
});

test('extendedEuclidean should handle zero inputs', () => {
    const result = extendedEuclidean(0, 15);
    expect(result.gcd).toBe(15);
    expect(result.x).toBe(0);
    expect(result.y).toBe(1);
});

test('extendedEuclidean should throw error for negative inputs', () => {
    expect(() => extendedEuclidean(-56, 15)).toThrow('Inputs must be non-negative');
});