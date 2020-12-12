const express = require('express');
const bodyParser = require('body-parser');

require('./db.js');
var productController = require('./controllers/productController.js');
const e = require('express');

const port = process.env.PORT || 3000

let app = express();
app.use(bodyParser.json());

app.use('/products',productController); //routing to product

app.listen(port, () => console.log(`Server started at port ${port}`) );
