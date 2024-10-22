require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const ProductRoute = require('./routes/productRoute')
const errorMiddleWare = require('./middleware/errorMiddleWare')
const UserController = require('./controllers/userController')
const UserRoute = require('./routes/userRoute')
const uri = process.env.MONGODB_URL
// String MONgo_Url = process.env.MONGODB_URL
// MONGODB_URL = "mongodb+srv://mihretunode:lGTOks2gLpaTHpIQ@methane.0fjzoxr.mongodb.net/nodeapi?retryWrites=true&w=majority"


const app = express();
const port = process.env.PORT|| 8000;
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
    
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded(
    {
        extended: false
    }))


app.use('/api/products', ProductRoute)
app.use("/api/users", UserRoute)


app.get('/', (req, res)=>{
    res.send('node api')
})

app.use(errorMiddleWare )
 


// app.use((err, req, res, next)=>{
//     console.error(err.stack)
//     res.status(500).send({error: err.toString()})
// }) 
// app.get('/', (req, res)=>{
//     throw new Error("fake error");
//     res.send('hello node api')
// })

class ServerSelectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerSelectionError';
  }

  assimilateError(originalError) {
    this.message = originalError.message;
    this.stack = originalError.stack;
    this.code = originalError.code;
    // Add any other properties from the original error you want to retain
  }
}

//checking the server is working
async function connectToDatabase(){
    try{
        mongoose.set("strictQuery", false);
await  mongoose.connect(uri,{
    useNewUrlParser: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 30000,

});

    console.log('MongoDB connected...')

    app.listen(port, () => console.log(`Server is running on port ${port}`))

    }
    catch (err){
        // const handledError = _handleConnectionErrors(err);
    console.error('MongoDB connection error:', err);
    }
}

connectToDatabase();
