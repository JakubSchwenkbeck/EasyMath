import express, { Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { extendedEuclidean } from './euclid';
import { chineseRemainderTheorem } from './crt';
import { lcm } from './lcm';
import { generateRSAKeys, rsaEncrypt, rsaDecrypt, rsaSign, rsaVerify, tryCrackRSA } from './rsa';

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Euclidean gets and posts
app.get('/eea', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/eea.html'));
});

app.post('/eea', (req: Request, res: Response) => {
    const a: number = Number(req.body.a);
    const b: number = Number(req.body.b);
    const { gcd, x, y } = extendedEuclidean(a, b);
    res.json({ gcd, x, y });
});

// CRT gets and posts
app.get('/crt', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/crt.html'));
});

app.post('/crt', (req: Request, res: Response) => {
    const remainders: number[] = req.body.remainders.split(',').map(Number);
    const moduli: number[] = req.body.moduli.split(',').map(Number);
    const result: number = chineseRemainderTheorem(remainders, moduli);
    res.json({ result });
});

// LCM gets and posts
app.post('/lcm', (req: Request, res: Response) => {
    const a: number = Number(req.body.a);
    const b: number = Number(req.body.b);
    const result: number = lcm(a, b);
    res.json({ lcm: result });
});

// RSA gets and posts
app.get('/rsa', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/rsa.html'));
});

app.post('/generate-keys', (req: Request, res: Response) => {
    const { p, q, e } = req.body;
    const keys = generateRSAKeys(p, q,e);
    res.json(keys);
});

app.post('/encrypt', (req: Request, res: Response) => {
    const { e, n, message } = req.body;
    const cipher = rsaEncrypt({ e, n }, message);
    res.json({ cipher });
});

app.post('/decrypt', (req: Request, res: Response) => {
    const { d, n, cipher } = req.body;
    const message = rsaDecrypt(d, { e: 0, n }, cipher); // e is not needed for decryption
    res.json({ message });
});

app.post('/sign', (req: Request, res: Response) => {
    const { d, n, message } = req.body;
    const signature = rsaSign(d, { e: 0, n }, message); // e is not needed for signing
    res.json({ signature });
});

app.post('/verify', (req: Request, res: Response) => {
    const { e, n, signature, message } = req.body;
    const verified = rsaVerify({ e, n }, signature, message);
    res.json({ verified });
});

app.post('/crack', (req: Request, res: Response) => {
    const { n, phi } = req.body;
    const { p, q } = tryCrackRSA(n, phi);
    res.json({ p, q });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});