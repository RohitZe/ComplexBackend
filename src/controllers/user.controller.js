import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {Apiresponse} from "../utils/apiResponse.js"




const registerUser=asyncHandler( async (req,res)=>{
 //step-1 get data from frontend 
   
  const {fullname,email,password,username}=req.body
  console.log("email",email);
 //validation

 if([fullname,email,password,username].some((field)=>
    field?.trim()===""))
 {
  throw new ApiError(400,"All fields are required")
 }

//checking if user already exist
 const existedUser=User.findOne(
    {
    $or:[{email}, {username}]
    })

if(existedUser)
{
    throw new ApiError(400,"Username and email already existed")
}

const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path;

if(!avatarLocalPath)
{
    throw new ApiError(400,"Avatar is required")
}

const avatar=await uploadOnCloudinary(avatarLocalPath);
const coverImage=await uploadOnCloudinary(coverImageLocalPath);

if(!avatar)
{
    throw new ApiError(400,"Avatar is required")   
}

const user= await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
})

const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser)
{
    throw new ApiError(500,"something went wrong while registering the user")
}

 return res.status(201).json(
    new Apiresponse(200,createdUser,"User registered successfully")
 )

})

export { registerUser}



