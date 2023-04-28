//http://localhost:8000/product?title=iPhone&price=999.99
//http://localhost:7000/product?title=iPhone&price=500

// Task 1
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';

const port = 8000;
const app = express();
const staticFilePort = 7000;

app.get('/', (req,res)=>{
    res.send('<h1>Wellcome to our shop</h1>');
})

app.get('/product', (req,res)=>{
    const title = req.query?.title || '';
    const price = req.query?.price || '';
    res.send(`<h1>${title}</h1> <br>
             <h2>For just ${price}</h2>`);
})

app.listen(port, ()=>{
    console.log(`Server is on http://localhost:${port}`);
})

// Task 2
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/views/index.html'));
})
app.listen(staticFilePort, ()=> {
    console.log(`Server is on http://localhost:${staticFilePort}`);
})

// Task 3
app.set('view engine', 'pug');

app.get('/product', (req,res)=>{
    const title = req.query?.title || '';
    const price = req.query?.price || '';
    res.render('product', {product_title: title, product_price: price});
})

// Task 4
const require = createRequire(import.meta.url);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));