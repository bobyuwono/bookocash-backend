const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
   selling_price : Number,
   purchase_price: Number,
   stock : Number,
   product_id : Number,
   product_name: String,

})

var Product = mongoose.model('Product', productScheme); 

module.exports = {Product} ;