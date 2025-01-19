import { Command } from 'commander';
import { generateRSAKeys, rsaEncrypt, rsaDecrypt, rsaSign, rsaVerify, tryCrackRSA } from './rsa';
import { extendedEuclidean, gcd } from './euclid';
import { chineseRemainderTheorem } from './crt';
import { lcm } from './lcm';
import readline from 'readline';

const program = new Command();

program
    .name('mathutil-cli')
    .description('CLI for Math Utilities')
    .version('1.0.0');

program
    .command('generate-keys')
    .description('Generate RSA keys')
    .requiredOption('-p, --prime1 <number>', 'First prime number')
    .requiredOption('-q, --prime2 <number>', 'Second prime number')
    .requiredOption('-e, --exponent <number>', 'Public exponent')
    .action((options) => {
        const { prime1, prime2, exponent } = options;
        const keys = generateRSAKeys(Number(prime1), Number(prime2), Number(exponent));
        console.log('Public Key:', keys.publicKey);
        console.log('Private Key:', keys.privateKey);
    });

program
    .command('encrypt')
    .description('Encrypt a message')
    .requiredOption('-e, --exponent <number>', 'Public exponent')
    .requiredOption('-n, --modulus <number>', 'Modulus')
    .requiredOption('-m, --message <number>', 'Message to encrypt')
    .action((options) => {
        const { exponent, modulus, message } = options;
        const cipher = rsaEncrypt({ e: Number(exponent), n: Number(modulus) }, Number(message));
        console.log('Encrypted Message:', cipher);
    });

program
    .command('decrypt')
    .description('Decrypt a message')
    .requiredOption('-d, --privateKey <number>', 'Private key')
    .requiredOption('-n, --modulus <number>', 'Modulus')
    .requiredOption('-c, --cipher <number>', 'Cipher to decrypt')
    .action((options) => {
        const { privateKey, modulus, cipher } = options;
        const message = rsaDecrypt(Number(privateKey), { e: 0, n: Number(modulus) }, Number(cipher));
        console.log('Decrypted Message:', message);
    });

program
    .command('sign')
    .description('Sign a message')
    .requiredOption('-d, --privateKey <number>', 'Private key')
    .requiredOption('-n, --modulus <number>', 'Modulus')
    .requiredOption('-m, --message <number>', 'Message to sign')
    .action((options) => {
        const { privateKey, modulus, message } = options;
        const signature = rsaSign(Number(privateKey), { e: 0, n: Number(modulus) }, Number(message));
        console.log('Signature:', signature);
    });

program
    .command('verify')
    .description('Verify a signature')
    .requiredOption('-e, --exponent <number>', 'Public exponent')
    .requiredOption('-n, --modulus <number>', 'Modulus')
    .requiredOption('-s, --signature <number>', 'Signature to verify')
    .requiredOption('-m, --message <number>', 'Message to verify')
    .action((options) => {
        const { exponent, modulus, signature, message } = options;
        const isValid = rsaVerify({ e: Number(exponent), n: Number(modulus) }, Number(signature), Number(message));
        console.log('Verification:', isValid ? 'Valid' : 'Invalid');
    });

program
    .command('crack')
    .description('Crack RSA keys')
    .requiredOption('-n, --modulus <number>', 'Modulus')
    .requiredOption('-p, --phi <number>', 'Phi (Euler\'s totient function)')
    .action((options) => {
        const { modulus, phi } = options;
        const { p, q } = tryCrackRSA(Number(modulus), Number(phi));
        console.log('Cracked Primes: p =', p, ', q =', q);
    });

program
    .command('eea')
    .description('Extended Euclidean Algorithm')
    .requiredOption('-a, --a <number>', 'First number')
    .requiredOption('-b, --b <number>', 'Second number')
    .action((options) => {
        const { a, b } = options;
        const result = extendedEuclidean(Number(a), Number(b));
        console.log('GCD:', result.gcd);
        console.log('Coefficients:', { x: result.x, y: result.y });
    });

program
    .command('gcd')
    .description('Greatest Common Divisor')
    .requiredOption('-a, --a <number>', 'First number')
    .requiredOption('-b, --b <number>', 'Second number')
    .action((options) => {
        const { a, b } = options;
        const result = gcd(Number(a), Number(b));
        console.log('GCD:', result);
    });

program
    .command('crt')
    .description('Chinese Remainder Theorem')
    .requiredOption('-r, --remainders <numbers>', 'Remainders (comma-separated)')
    .requiredOption('-m, --moduli <numbers>', 'Moduli (comma-separated)')
    .action((options) => {
        const remainders = options.remainders.split(',').map(Number);
        const moduli = options.moduli.split(',').map(Number);
        const result = chineseRemainderTheorem(remainders, moduli);
        console.log('Result:', result);
    });

program
    .command('lcm')
    .description('Least Common Multiple')
    .requiredOption('-a, --a <number>', 'First number')
    .requiredOption('-b, --b <number>', 'Second number')
    .action((options) => {
        const { a, b } = options;
        const result = lcm(Number(a), Number(b));
        console.log('LCM:', result);
    });

program
    .command('repl')
    .description('Start REPL mode')
    .action(() => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'mathutil-cli> '
        });

        rl.prompt();

        rl.on('line', (line) => {
            const args = line.trim().split(' ');
            if (args[0] === 'help') {
                console.log('MathUtil CLI Help');
                console.log('Usage: mathutil-cli <command> [options]');
                console.log('');
                console.log('Commands:');
                console.log('  generate-keys  Generate RSA keys');
                console.log('  encrypt        Encrypt a message');
                console.log('  decrypt        Decrypt a message');
                console.log('  sign           Sign a message');
                console.log('  verify         Verify a signature');
                console.log('  crack          Crack RSA keys');
                console.log('  eea            Extended Euclidean Algorithm');
                console.log('  gcd            Greatest Common Divisor');
                console.log('  crt            Chinese Remainder Theorem');
                console.log('  lcm            Least Common Multiple');
                console.log('  repl           Start REPL mode');
                console.log('  help           Display help information');
                console.log('');
                console.log('For detailed help on each command, use "mathutil-cli <command> --help"');
            } else {
                program.parse(['node', 'cli.ts', ...args], { from: 'user' });
            }
            rl.prompt();
        }).on('close', () => {
            console.log('Exiting REPL mode');
            process.exit(0);
        });
    });

program
    .command('help')
    .description('Display help information')
    .action(() => {
        console.log('MathUtil CLI Help');
        console.log('Usage: mathutil-cli <command> [options]');
        console.log('');
        console.log('Commands:');
        console.log('  generate-keys  Generate RSA keys');
        console.log('  encrypt        Encrypt a message');
        console.log('  decrypt        Decrypt a message');
        console.log('  sign           Sign a message');
        console.log('  verify         Verify a signature');
        console.log('  crack          Crack RSA keys');
        console.log('  eea            Extended Euclidean Algorithm');
        console.log('  gcd            Greatest Common Divisor');
        console.log('  crt            Chinese Remainder Theorem');
        console.log('  lcm            Least Common Multiple');
        console.log('  repl           Start REPL mode');
        console.log('  help           Display help information');
        console.log('');
        console.log('For detailed help on each command, use "mathutil-cli <command> --help"');
    });

program.parse(process.argv);