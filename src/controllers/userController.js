const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;


const signup = async (req,res) =>{
// Existing User Check
// Hashed Password
// User Creation
// Token Generate

const {email,password,username} = req.body;
try{
    const existingUser = await userModel.findOne({email : email}); // force the system halt until it is done
    if(existingUser){
        return res.status(400).json({message : "User already exist"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await userModel.create({
        email:email,
        password : hashedPassword,
        username : username
    });
    const token = jwt.sign({email : result.email, id : result.id},SECRET_KEY);
    res.status(201).
    json({message:"user added", user : result, token : token});

}catch(error){
console.log(error);
res.status(500).json({message:"Something went wrong!!!"});
}

};


const login = async (req,res)=>{

const {email, password} = req.body;
try{
    const existingUser = await userModel.findOne({email : email});
    if(!existingUser){
        return res.status(404).json({message : "User does not exist"});
    }
    const matchedPassword = await bcrypt.compare(password,existingUser.password);
    if(!matchedPassword){
        return res.status(400).json({message : "Invalid Credentials"});
    }
    const token = jwt.sign({email : existingUser.email, id : existingUser.id},process.env.SECRET_KEY);
    res.status(200).json({message : "Login Success",token : token});


}catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong!!!"});
}


};

module.exports = {signup, login}
