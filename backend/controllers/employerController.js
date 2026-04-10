const AsyncHandler = require("../utils/AsyncHandler");
const bcrypt = require("bcrypt");
const Employer = require("../models/employerModel");
const { genrateToken } = require("../utils/generateToken");

// REGISTER
let registerEmployer = AsyncHandler(async(req,res)=>{
    let {name,email,password,phoneNumber,industryType}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields required"
        })
    }

    let exist = await Employer.findOne({email});

    if(exist){
        return res.status(400).json({
            success:false,
            message:"Employer already exists"
        })
    }

    let hashedPassword = await bcrypt.hash(password,10);

    let employer = await Employer.create({
        name,
        email,
        password:hashedPassword,
        phoneNumber,
        industryType
    })

    let data = employer.toObject();
    delete data.password;

    res.status(201).json({
        success:true,
        message:"Employer Registered",
        data
    })
})

// LOGIN
let loginEmployer = AsyncHandler(async(req,res)=>{
    let {email,password}=req.body;

    let employer = await Employer.findOne({email});

    if(!employer){
        return res.status(404).json({
            success:false,
            message:"Employer not found"
        })
    }

    let match = await bcrypt.compare(password, employer.password);

    if(!match){
        return res.status(400).json({
            success:false,
            message:"Invalid Password"
        })
    }

    let token = genrateToken({id: employer._id},"1h");

    let data = employer.toObject();
    delete data.password;

    res.status(200).json({
        success:true,
        token,
        data
    })
})

// UPDATE
let updateEmployerProfile = AsyncHandler(async(req,res)=>{
 let updated = await Employer.findByIdAndUpdate(
    req.user.id,
    req.body,
    {new:true}
 )

 res.status(200).json({
    success:true,
    data:updated
 })
})

// GET PROFILE
let getEmployerProfile = AsyncHandler(async(req,res)=>{
 let employer = await Employer.findById(req.user.id).select("-password");

 if(!employer){
    return res.status(404).json({
        success:false,
        message:"Employer not found"
    })
 }

 res.status(200).json({
    success:true,
    data:employer
 })
})

// DELETE
let deleteEmployer = AsyncHandler(async(req,res)=>{
 let employer = await Employer.findById(req.user.id);

 if(!employer){
    return res.status(404).json({
        success:false,
        message:"Employer not found"
    })
 }

 await Employer.findByIdAndDelete(req.user.id);

 res.status(200).json({
    success:true,
    message:"Employer Deleted"
 })
})

module.exports = {
  registerEmployer,
  loginEmployer,
  updateEmployerProfile,
  getEmployerProfile,
  deleteEmployer
};