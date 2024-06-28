const Material = require('../models/Material');
const fs = require('fs');
const path = require('path');

exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().select('-imageUrl');
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMaterial = async (req, res) => {
  try {
    const { name, technology, colors, pricePerGram, applicationTypes } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newMaterial = new Material({
      name,
      technology,
      colors,
      pricePerGram,
      applicationTypes,
      imageUrl,
    });

    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMaterial = async (req, res) => {
  try {
    const { name, technology, colors, pricePerGram, applicationTypes } = req.body;
    const updateData = { name, technology, colors, pricePerGram, applicationTypes };

    if (req.file) {
      const material = await Material.findById(req.params.id);
      if (material.imageUrl) {
        fs.unlinkSync(path.join(__dirname, '..', material.imageUrl));
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    if (material.imageUrl) {
      fs.unlinkSync(path.join(__dirname, '..', material.imageUrl));
    }

    await material.remove();
    res.status(200).json({ message: 'Material deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
