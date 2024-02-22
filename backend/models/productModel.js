const mongoose =  require("mongoose")



//this is the schema
const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, 'Please enter a Product Name?']
        },
        quantity: {
            type: Number,
            requred: true, 
            default: 0
        },
        price : {
            type: Number,
            required: true,
        },
        image : {
            type: String, 
            required: false
        }
    },
    {
        timestamps: true
    }
)





//this the model for the schema
const Product = mongoose.model('Product', productSchema)

module.exports = Product;
