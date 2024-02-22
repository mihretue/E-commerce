const express = require('express')
const Product = require("../models/productModel")
const upload = require("../middleware/upload")
// const { uploadToCloudinary, removeFromCloudinary } = require("../cloudinary")
const routers = express.Router()

const {
    getProducts, 
    createProducts,
    getProduct, 
    updateProduct, 
    deleteProduct,
    uploadImage
} = require('../controllers/productController')


// const upload = require('../middleware/upload')


routers.use(express.json())

routers.post('/',  createProducts)

//upload product image 
// routers.post("/api/image/:id", upload.single("productImage"), uploadImage )
//Delete Product Image
// routers.delete("/api/image/:id",)


routers.get('/', getProducts )

routers.get('/:id', getProduct)


routers.put('/:id',updateProduct )


routers.delete('/:id', deleteProduct)

module.exports = routers;