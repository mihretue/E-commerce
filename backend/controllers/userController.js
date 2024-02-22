const User = require('../models/userModel')



const signUp = async(req, res)=>{
    try {
        const {firstName, lastName, userName, password,confirmPassword} = req.body;


        if(!firstName || !lastName || !userName || !password || !confirmPassword){
            return res.status(400).json({message: "All fields are required"})
        }

        if(password !== confirmPassword){
            return res.status(400).json({message: "Password and confirm password do not match"})
        }

        //hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        //save user to database
        const newUser = new User({firstName,lastName,userName,password: hashedPassword})
        await newUser.save();



        res.status(201).json({message: "user signed up successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {signUp};