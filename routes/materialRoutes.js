const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const materialController = require('../controllers/materialController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

router.get('/materials', materialController.getAllMaterials);
router.get('/materials/:id', materialController.getMaterialById);
router.post('/materials', upload.single('image'), materialController.createMaterial);
router.put('/materials/:id', upload.single('image'), materialController.updateMaterial);
router.delete('/materials/:id', materialController.deleteMaterial);

module.exports = router;
