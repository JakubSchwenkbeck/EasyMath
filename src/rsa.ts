import { extendedEuclidean,gcd } from './euclid';


// Function to generate RSA private keys
export function generateRSAKeys(p: number, q: number ): {publicKey: {e: number, n : number},  privateKey: number } {
    
    // Generate RSA keys
    const n = p * q;
    const phi = (p - 1) * (q - 1);

    // Choose e such that 1 < e < phi and gcd(e, phi) = 1
    let e = 3; // Common choice for
  
    // Calculate d such that (d * e) % phi = 1
    const { x: d } = extendedEuclidean(e, phi);

    return {
        publicKey: { e, n },
        privateKey: d < 0 ? d + phi : d // Ensure d is positive
    };
}

export function rsaEncrypt(publicKey: {e: number, n: number}, message: number): number {
    return (message ** publicKey.e) % publicKey.n; // c = m^e mod n
}

export function rsaDecrypt(privateKey: number, publicKey: {e: number, n: number}, cipher: number): number {
    return (cipher ** privateKey) % publicKey.n; // m = c^d mod n
}

export function rsaSign(privateKey: number, publicKey: {e: number, n: number}, message: number): number {
    return rsaDecrypt(privateKey, publicKey, message); // Signature is the same as decryption
}

export function rsaVerify(publicKey: {e: number, n: number}, signature: number, message: number): boolean {
    return rsaEncrypt(publicKey, signature) === message; // Verify signature by encrypting it and comparing to message
}


export function rsaEncryptString(publicKey: {e: number, n: number}, message: string): number[] {
    return message.split('').map(char => rsaEncrypt(publicKey, char.charCodeAt(0)));
}

export function rsaDecryptString(privateKey: number, publicKey: {e: number, n: number}, cipher: number[]): string {
    return cipher.map(char => String.fromCharCode(rsaDecrypt(privateKey, publicKey, char))).join('');
}

export function rsaSignString(privateKey: number, publicKey: {e: number, n: number}, message: string): number[] {
    return message.split('').map(char => rsaSign(privateKey, publicKey, char.charCodeAt(0)));
}

export function rsaVerifyString(publicKey: {e: number, n: number}, signature: number[], message: string): boolean {
    return signature.map(char => rsaVerify(publicKey, char, message.charCodeAt(0))).every(verified => verified);
}

export function tryCrackRSA(n : number, phi: number): {p: number, q: number} {
    let a = 1;
    let b = n - phi + 1;
    let c = 2;

    let p = (-b + Math.sqrt(b**2 - 4*a*c))/(2*a);
    let q = n/p;
    return {p, q};
}