const asyncHandler = require("express-async-handler")
const userModel = require("../models/UserModel")
const ApiError = require("../utils/ApiError")

exports.createUser = asyncHandler( async (req, res , next) => {
    
    const info = await userModel.create(req.body)
    res.status(201).json({data: info});
    
})

exports.getInformation= asyncHandler( async (req, res ,next) => {
    const info = await userModel.find({});
    if(!info){
        return next(new ApiError("there is no data to retrieve" , 404))
    }
    res.status(200).json({data: info});
});

exports.getAdmin= asyncHandler( async (req, res,next) => {
    const {id} = req.params
    const adminId = await userModel.findById(id)
    if(!adminId){
        return next(new ApiError("there is no data to retrieve" , 404))
    }
    res.status(200).json({data: adminId})
})

exports.deleteUser= asyncHandler( async (req , res , next) => {
    const {id} = req.params
    const userID = await userModel.findByIdAndDelete(id)
    if(!userID){
        return next (new ApiError("there is no user to delete" , 404))
    }
    res.status(200).send()
})



