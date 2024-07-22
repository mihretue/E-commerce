const express = require('express')
const Product = require("../models/productModel")
const multer = require('multer')
const path = require('path')
// const { uploadToCloudinary, removeFromCloudinary } = require("../cloudinary")
const routers = express.Router()

const {
    getProducts, 
    createProducts,
    getProduct, 
    updateProduct, 
    deleteProduct,
    
} = require('../controllers/productController')


// const upload = require('../middleware/upload')


routers.use(express.json())

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});


// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  },
});


routers.post('/',upload.single('image'), createProducts)

//upload product image 
// routers.post("/api/image/:id", upload.single("productImage"), uploadImage )
//Delete Product Image
// routers.delete("/api/image/:id",)


routers.get('/', getProducts )

routers.get('/:id', getProduct)


routers.put('/:id',updateProduct )


routers.delete('/:id', deleteProduct)

module.exports = routers;