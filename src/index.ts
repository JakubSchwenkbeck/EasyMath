import express from 'express';

const app = express();
const port = 3000;

// Math utility function
function add(a: number, b: number): number {
    return a + b;
}

app.get('/', (req, res) => {
    res.send(`<h1>Math Utility</h1><p>3 + 5 = ${add(3, 5)}</p>`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
