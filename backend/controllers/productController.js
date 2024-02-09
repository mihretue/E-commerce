const { uploadToCloudinary, removeFromCloudinary } = require('../cloudinary')
const Product = require('../models/productModel')
const asyncHandler = require("express-async-handler")


const createProducts = asyncHandler(async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})



const uploadImage = asyncHandler(
    async(req, res) => {
        try {
            //upload image to cloudinary
            const data = await uploadToCloudinary(req.file.path, "product-images")

            //save image url and publiId to the data 
            const {id} = req.params
            const savedImg = await Product.findByIdAndUpdate(
                {id: id},
                {
                    $set: {
                        image: data.url,
                        pulicId: data.public_id,
                    },
                }
            )
            res.status(200).send("product image uploaded with success!")
        } catch (error) {
            res.status(400).send(error)
        }
    }
)






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
    uploadImage
}