import { extendedEuclidean } from "./euclid";
import assert from 'assert';

// Chinese Remainder Theorem
export function chineseRemainderTheorem(remainders: number[], moduli: number[]): number {
    // Preconditions
    assert(remainders.length === moduli.length, 'Remainders and moduli arrays must have the same length');
    remainders.forEach((r, i) => {
        assert(Number.isInteger(r) && Number.isInteger(moduli[i]), 'Remainders and moduli must be integers');
        assert(moduli[i] > 0, 'Moduli must be positive');
    });

    const prod = moduli.reduce((a, b) => a * b, 1);
    let sum = 0;

    for (let i = 0; i < moduli.length; i++) {
        const p = prod / moduli[i];
        const { x } = extendedEuclidean(p, moduli[i]);
        sum += remainders[i] * x * p;
    }

    let result = sum % prod;
    let ret = result < 0 ? result + prod : result;
    assert(ret >= 0 && ret < prod, 'Result must be in the range [0, prod)');
    return ret;
}