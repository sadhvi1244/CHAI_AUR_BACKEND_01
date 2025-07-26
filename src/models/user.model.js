import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String, //cloudinary url
    },
    warchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    passward: {
      type: String,
      required: [true, "passward is required"],
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//pre middleware to generate JWT token
userSchema.pre("save", async function (next) {
  if (!this.isModified("passward")) return next(); //we only want to hash the password if it has been modified or is new
  this.passward = await bcrypt.hash(this.passward, 10); //hashing the password before saving for 10 rounds
  next();
});

userSchema.methods.isPasswordCorrect = async function (passward) {
  return await bcrypt.compare(passward, this.passward);
};

userSchema.methods.generateAccessToken = function () {
  jwt.sign(
    {
      //payload data to be included in the token
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d", //default expiry is 1 day
    }
  );
};

userSchema.methods.generateRefereshToken = function () {
  jwt.sign(
    {
      //payload data to be included in the token
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d", //default expiry is 10 days
    }
  );
};

export const User = mongoose.model("User", userSchema);
