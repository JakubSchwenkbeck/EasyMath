// Extended Euclidean Algorithm
export function extendedEuclidean(a: number, b: number): { gcd: number, x: number, y: number } {
    if (b === 0) {
        return { gcd: a, x: 1, y: 0 };
    }
    const { gcd, x, y } = extendedEuclidean(b, a % b);
    return { gcd, x: y, y: x - Math.floor(a / b) * y };
}

// standard Euclidean Algorithm
export function Euclidean(a: number, b: number): { gcd: number} {
   if (b === 0) {
       return { gcd: a};
   }
   if (a === 0) {
       return { gcd: b};
   }
    return Euclidean(b, a % b);
}