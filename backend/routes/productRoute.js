const express = require('express')
const Product = require("../models/productModel")
const routers = express.Router()
const {
    getProducts, 
    createProducts,
    getProduct, 
    updateProduct, 
    deleteProduct} = require('../controllers/productController')


routers.use(express.json())

routers.post('/',  createProducts)

routers.get('/', getProducts )

routers.get('/:id', getProduct)


routers.put('/:id',updateProduct )


routers.delete('/:id', deleteProduct)

module.exports = routers;