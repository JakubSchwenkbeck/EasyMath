import { generateRSAKeys, rsaEncrypt, rsaDecrypt, rsaSign, rsaVerify } from '../src/rsa';

describe('RSA Utilities', () => {
    let publicKey: { e: number, n: number };
    let privateKey: number;
    const message = 42;

    beforeAll(() => {
        const keys = generateRSAKeys(61, 53, 17); // Small primes for testing
        publicKey = keys.publicKey;
        privateKey = keys.privateKey;
    });

    test('should generate valid RSA keys', () => {
        expect(publicKey.e).toBeGreaterThan(1);
        expect(publicKey.n).toBeGreaterThan(1);
        expect(privateKey).toBeGreaterThan(1);
    });

    test('should fail to verify an incorrect signature', () => {
        const incorrectSignature = rsaSign(privateKey, publicKey, message + 1);
        const isValid = rsaVerify(publicKey, incorrectSignature, message);
        expect(isValid).toBe(false);
    });
});