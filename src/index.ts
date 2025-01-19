import express from 'express';
import path from 'path';
import { extendedEuclidean, gcd } from './euclid';
import { chineseRemainderTheorem } from './crt';
import { lcm } from './lcm';
import bodyParser from 'body-parser';
import { generateRSAKeys, rsaEncrypt, rsaDecrypt, rsaSign, rsaVerify } from './rsa';


const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});



// Euclidean gets and posts

app.get('/eea', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/eea.html'));
});

app.post('/eea', (req, res) => {
    const a = Number(req.body.a);
    const b = Number(req.body.b);
    const { gcd, x, y } = extendedEuclidean(a, b);
    res.json({ gcd, x, y });
});

// LCM gets and posts
app.post('/lcm', (req,  res) => {
    const a: number = Number(req.body.a);
    const b: number = Number(req.body.b);
    const result: number = lcm(a, b);
    res.json({ lcm: result });
});



// CRT gets and posts
app.get('/crt', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/crt.html'));
});

app.post('/crt', (req, res) => {
    const remainders = req.body.remainders.split(',').map(Number);
    const moduli = req.body.moduli.split(',').map(Number);
    const result = chineseRemainderTheorem(remainders, moduli);
    res.json({ result });
});


// RSA gets and posts
app.get('/rsa', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/rsa.html'));
});

app.post('/generate-keys', (req,res) => {
    const { p, q } = req.body;
    const keys = generateRSAKeys(p, q);
    res.json(keys);
});

app.post('/encrypt', (req,res) => {
    const { e, n, message } = req.body;
    const cipher = rsaEncrypt({ e, n }, message);
    res.json({ cipher });
});

app.post('/decrypt', (req,res) => {
    const { d, n, cipher } = req.body;
    const message = rsaDecrypt(d, { e: 0, n }, cipher); // e is not needed for decryption
    res.json({ message });
});

app.post('/sign', (req,res) => {
    const { d, n, message } = req.body;
    const signature = rsaSign(d, { e: 0, n }, message); // e is not needed for signing
    res.json({ signature });
});

app.post('/verify', (req,res) => {
    const { e, n, signature, message } = req.body;
    const verified = rsaVerify({ e, n }, signature, message);
    res.json({ verified });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
