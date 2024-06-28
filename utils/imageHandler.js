const fs = require('fs');
const path = require('path');

const uploadImage = (file) => {
  const newPath = `uploads/${Date.now()}-${file.originalname}`;
  fs.renameSync(file.path, newPath);
  return newPath;
};

const deleteImage = (imageUrl) => {
  const filePath = path.resolve(imageUrl);
  fs.unlinkSync(filePath);
};

module.exports = { uploadImage, deleteImage };
