const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} = require('../controllers/materialController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/materials', getMaterials);
router.get('/materials/:id', getMaterialById);
router.post('/materials', upload.single('image'), createMaterial);
router.put('/materials/:id', upload.single('image'), updateMaterial);
router.delete('/materials/:id', deleteMaterial);

module.exports = router;
