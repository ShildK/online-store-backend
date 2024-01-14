
const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
import { authenticateToken, login, register } from './controllers/authenticationController';
import { getUserShoppingCartItems, setUserShoppingCartItems } from './controllers/cartController';
import { getCategories, getFilter, getProductById, getProducts } from './controllers/productController';

const app = express();
const port = 3500;
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());

app.use(bodyParser.json());

app.post('/register', register);
app.post('/login', login);

app.get('/category', getCategories);
app.get('/products', getProducts)
app.get('/filter', getFilter)
app.get('/getProductById', getProductById);
app.get('/getUserShoppingCartItems', authenticateToken, getUserShoppingCartItems);
app.post('/setUserShoppingCartItems', authenticateToken, setUserShoppingCartItems);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
