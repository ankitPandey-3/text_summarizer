import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRes.js";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {fullName, username,  email, password } = req.body;
    if([fullName, email, username, password].some((field) => field?.trim() === "")){
        return res.status(400).json(
            new ApiError(400, "All fields are required")
        );
    }

    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })

    if (existedUser) {
        return res.status(409).json(
            new ApiError(409, "User already exist !!")
        );
    }

    if(password.length < 8 || password.length > 14){
        return res.status(400).json(
            new ApiError(400, "Invalid Password Length")
        );
    }
    

    const user = await User.create({
        fullName,
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        return res.status(500).json(
            new ApiError(500, "Something went wrong while registering the user")
        );
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if(!username && !email) {
        return res.status(400).json(
            new ApiError(400, "username or email is required")
        );
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        return res.status(404).json(
            new ApiError(404, "User does not exist")
        );
       
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        return res.status(401).json(
            new ApiError(401, "Invalid user credentials")
        );
        
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshtoken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})
export{
    registerUser,
    loginUser,
    logoutUser
}
