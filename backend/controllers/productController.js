const Product = require('../models/productModel')



const createProducts = async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}

const getProducts = async(req, res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(504),json({message: error.message})
    }
}

const getProduct = async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateProduct = async(req, res)=>{
    try {
        const {id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product){
            return res.status(404).json({message: `cannot find the product with this id ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteProduct = async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findOneAndDelete({_id:id})
        if (!product){
            res.status(404).json({message: `we couldnot find the product with this id ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



module.exports = {
    getProducts,createProducts,getProductById,updateProduct,deleteProduct
}