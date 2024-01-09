require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose")
const ProductRoute = require('./routes/productRoute')
// const uri = process.env.MONGODB_URI
// String MONgo_Url = process.env.MONGODB_URL
MONGODB_URL = "mongodb+srv://mihretunode:lGTOks2gLpaTHpIQ@methane.0fjzoxr.mongodb.net/nodeapi?retryWrites=true&w=majority"



const app = express();
const port = process.env.PORT|| 8000;
// const uri = "mongodb+srv://<username>:<password>@methane.0fjzoxr.mongodb.net/?retryWrites=true&w=majority"
app.use('/api/products', ProductRoute)
app.use(express.json())
app.use(express.urlencoded({encoded: false}))
app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send({error: err.toString()})
})




//checking the server is working
mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URL)
.then(() => {
 console.log('MongoDB connected...')
 app.listen(port, () => console.log(`Server is running on port ${port}`))
})
.catch(err => console.error('Could not connect to MongoDB...', err))