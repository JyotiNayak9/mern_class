const cloudinary = require('cloudinary').v2;
require("dotenv").config()

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  api_key:process.env.CLOUDINARY_API_KEY,
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_secret:process.env.CLOUDINARY_API_SECRET
});


// console.log(cloudinary)

// Uploads an image file
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      return result.url;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

module.exports = uploadImage