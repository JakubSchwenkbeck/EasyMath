import { extendedEuclidean } from "./euclid";

// Chinese Remainder Theorem
export function chineseRemainderTheorem(remainders: number[], moduli: number[]): number {
    const prod = moduli.reduce((a, b) => a * b, 1);
    let sum = 0;

    for (let i = 0; i < moduli.length; i++) {
        const p = prod / moduli[i];
        const { x } = extendedEuclidean(p, moduli[i]);
        sum += remainders[i] * x * p;
    }

    let result = sum % prod;
    return result < 0 ? result + prod : result;
}