import { lcm } from '../src/lcm';

describe('lcm', () => {
    test('should return correct LCM for positive integers', () => {
        expect(lcm(4, 5)).toBe(20);
        expect(lcm(6, 8)).toBe(24);
        expect(lcm(21, 6)).toBe(42);
    });

    test('should return correct LCM for same numbers', () => {
        expect(lcm(5, 5)).toBe(5);
        expect(lcm(10, 10)).toBe(10);
    });

    test('should throw error for non-integer inputs', () => {
        expect(() => lcm(4.5, 5)).toThrow('Inputs must be integers');
        expect(() => lcm(4, 5.5)).toThrow('Inputs must be integers');
    });

    test('should throw error for non-positive inputs', () => {
        expect(() => lcm(-4, 5)).toThrow('Inputs must be positive');
        expect(() => lcm(4, 0)).toThrow('Inputs must be positive');
    });
});