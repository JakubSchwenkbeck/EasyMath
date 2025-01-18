import assert from 'assert';
// Extended Euclidean Algorithm
export function extendedEuclidean(a: number, b: number): { gcd: number, x: number, y: number } {
    // Preconditions
    assert(Number.isInteger(a) && Number.isInteger(b), 'Inputs must be integers');
    assert(a >= 0 && b >= 0, 'Inputs must be non-negative');
    if (b === 0) {
        return { gcd: a, x: 1, y: 0 };
    }
    const { gcd, x, y } = extendedEuclidean(b, a % b);
    
    // Postconditions
    assert(gcd === Math.abs(gcd), 'GCD must be non-negative');   
    return { gcd, x: y, y: x - Math.floor(a / b) * y };
}

// standard Euclidean Algorithm
export function gcd(a: number, b: number): number {
   // Preconditions
   assert(Number.isInteger(a) && Number.isInteger(b), 'Inputs must be integers');
   assert(a >= 0 && b >= 0, 'Inputs must be non-negative');
   
   if (b === 0) {
       return a;
   }
   if (a === 0) {
       return b;
   }
   let res: number = gcd(b, a % b);
   // Postconditions
    assert(res === Math.abs(res), 'GCD must be non-negative');

    return res;
}