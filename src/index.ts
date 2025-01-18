import express from 'express';
import path from 'path';
import { extendedEuclidean, Euclidean } from './euclid';
import { chineseRemainderTheorem } from './crt';
import bodyParser from 'body-parser';

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


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
