// const { uploadToCloudinary, removeFromCloudinary } = require('../cloudinary')
const multer = require ('multer')
const Product = require('../models/productModel')
const asyncHandler = require("express-async-handler")

//set up storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

//initialize upload
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

const createProducts = asyncHandler(async(req, res)=>{
    try {
        const {productName,quantity,price} = req.body
        const {file} = req

        const product = new Product({
            productName,
            quantity,
            price,
            image: {
                data: file.buffer,
               type: file.mimetype,
            }
        })
        //save product to database 
        await product.save()
        //send created product as response
        res.status(200).json(product)

    } catch (error) {
        // Log the error for debugging
    console.error('Error creating product:', error);

    // Send a user-friendly error message
    res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
})



// const uploadImage = asyncHandler(
//     async(req, res) => {
//         try {
//             //upload image to cloudinary
//             const data = await uploadToCloudinary(req.file.path, "product-images")

//             //save image url and publiId to the data 
//             const {id} = req.params
//             const savedImg = await Product.findByIdAndUpdate(
//                 {id: id},
//                 {
//                     $set: {
//                         image: data.url,
//                         pulicId: data.public_id,
//                     },
//                 }
//             )
//             res.status(200).send("product image uploaded with success!")
//         } catch (error) {
//             res.status(400).send(error)
//         }
//     }
// )






const deleteImage = asyncHandler(
    async(req, res) =>{
        try {
            //find the product 
            const {id} = req.params.id
            const product = await Product.findById(id)

            //find its public id
            const publicId = Product.publicId
            //delete from cloudinary
            await removeFromCloudinary(publicId);
            //remove from mongoose 
            const deleteImg = await Product.findByIdAndUpdate(
                id, {
                    $set: {
                        image: "",
                        publicId: "",
                    }
                }
            );
            res.status(200).send("product image deleted with success!");
        } catch (error) {
            res.status(400).send(error)
        }
    }
)






const getProducts = asyncHandler (async(req, res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})





const getProduct =asyncHandler( async(req, res)=>{
    try {
        
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})





const updateProduct = asyncHandler(  async(req, res)=>{
    try {
        const {id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product){
            res.status(404)
            throw new Error(`cannot find the product with this id ${id}`)        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)    }
})

const deleteProduct = asyncHandler (async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findOneAndDelete({_id:id})
        if (!product){
            res.status(404)
            throw new Error(`we couldnot find the product with this id ${id}`)
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
}
)



module.exports = {
    getProducts,
    createProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    
}