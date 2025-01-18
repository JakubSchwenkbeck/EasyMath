import { gcd } from "./euclid";
import assert from 'assert';

export function lcm(a: number, b: number): number {
    // Preconditions
    assert(Number.isInteger(a) && Number.isInteger(b), 'Inputs must be integers');
    assert(a > 0 && b > 0, 'Inputs must be positive');

    const gcdValue: number = gcd(a, b);
    const result: number = (a * b) / gcdValue;

    // Postconditions
    assert(result > 0, 'Result must be positive');
    return result;
}