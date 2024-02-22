const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter a Name?']
        },
        lastName: {
            type: String,
            required: [true, 'Please enter a Name?']
        },
        userName: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            Unique: true,
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;