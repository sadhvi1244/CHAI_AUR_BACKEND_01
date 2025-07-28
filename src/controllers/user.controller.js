import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "ok",

  //1. get user details from frontend
  //2. validation - check not empty
  //3. check if user already exists - check from username & and mail
  //4. check for cover img, check for avatar
  //5. upload them to cloudinary,and check there must be avatar
  //6. create user object - crete entry in db
  //7. remove passward and refresh token field from response
  //8. check for user creation
  //9. return response with user details

  //now
  //1. get user details from frontend
  const { fullName, email, username, password } = req.body;

  //2. validation - check not empty
  // if(fullName == "" ) {
  //   throw new ApiError(400,"fullName is required")
  // }
  if (
    [fullName, email, username, password].some((filed) => filed?.trim() === "") //some checks if any field is empty
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //3. check if user already exists - check from username & and mail
  // const existedUser = User.findOne({email})
  // if (existedUser) {
  //   throw new ApiError(400, "User already exists with this email");
  // }

  const existedUser = await User.findOne({
    //for multiple fields, use $or operator
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists with this username or email");
  }

  //4. check for cover img, and avatar
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  //classic way to check if coverImage is present
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //5. upload them to cloudinary,and check there must be avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Avatar upload failed");
  }

  //6. create user object - crete entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //7. remove passward and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //8. check for user creation
  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  //9. return response with user details
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
