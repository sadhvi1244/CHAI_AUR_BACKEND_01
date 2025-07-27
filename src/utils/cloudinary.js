import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath, publicId) => {
  try {
    if (!localFilePath) return null;

    //upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      public_id: publicId,
      resource_type: "auto", // Automatically detect the resource type
    });
    //file has been uploaded successfully
    console.log("file is uploaded successfully", response.url);
    return response;
  } catch {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    console.error("Error uploading file to Cloudinary");
    return null;
  }
};

export { uploadOnCloudinary };
