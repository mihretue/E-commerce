const express = require("express");
const mongoose = require("mongoose")
const Product = require("./models/productModel")
const app = express();
const port = process.env.PORT|| 8000;
const uri = "mongodb+srv://<username>:<password>@methane.0fjzoxr.mongodb.net/?retryWrites=true&w=majority"

app.use(express.json())
// app.use(express.urlencoded({encoded: false}))
//routes
app.get('/', (req, res)=> {
    res.send("hello node api")
})



app.post('/products', async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})

app.get('/products', async(req, res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(504),json({message: error.message})
    }
})

app.get('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


app.put('/products/:id', async(req, res)=>{
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
})


app.delete('/products/:id', async(req, res)=>{
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
})










//checking the server is working
mongoose.set("strictQuery", false)
mongoose.
connect("mongodb+srv://mihretunode:lGTOks2gLpaTHpIQ@methane.0fjzoxr.mongodb.net/nodeapi?retryWrites=true&w=majority")
.then(()=>{
    console.log("database connected successfully")
    app.listen(port, ()=>{
        console.log(`app is running on port ${port}`)
    })
})
.catch((error)=> {
    console.log(error)
})