const express = require('express');
const product = require('../models/product');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;

let { Product } = require('../models/product');

//localhost: 3000/products/list
//router to get all of product list
router.get('/', (req,res)=>{
    Product.find((err,docs) =>{
        if(!err){
            res.send(docs); 
        } else{
            console.log('Error in retreaving Products :' 
            + JSON.stringify(err,undefined,2))
        }
    } );
});

//router to GET a specific product by id
router.get('/:id', async function(req,res){
    _id = req.params.id;

    try{
        const product  = await Product.findById(_id);
        res.send(product);
    } catch(e){
        res.send(e).status(500);
    }
 
} )

//router to post a product
router.post('/', async function (req,res) {
    let prod  = new Product(req.body);
    try {
        await prod.save();
        res.status(201).send(prod);
    } catch(e){
        res.status(400).send(e);
    }
})

//router to update a product's detail
router.patch('/:id', async function(req,res){
    try{
        const updates = Object.keys(req.body);
        const allowedUpdates = ['stock', 'selling_price', 'purchase_price'];
        const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    
        if(!isValidOperation){
            return res.status(404).send({error: 'Invalid updates!'})
        }
    
        _id = req.params.id;

        const product = await Product.findByIdAndUpdate(_id, req.body, {new: true, runValidators:true});
        //if no product is found
        if(!product){
            return res.status(404).send({error: 'product id unavilable'});
        }
        //if updates went well
        res.send(product)
    }catch(e){
        res.status(500).send(e)
    }
})

//router to delete a product

router.delete('/:id', async function(req,res){
    _id = req.params.id;

    try{
        await Product.findByIdAndDelete(_id);
        res.send({message: 'berhasil'}).status(200);
    }catch (e){
        res.status(500).send(e);
    }
} )

module.exports = router;
