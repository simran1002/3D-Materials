const Material = require('../models/Material');
const path = require('path');
const fs = require('fs');

exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find().select('-imageUrl');
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMaterial = async (req, res) => {
  const material = new Material({
    name: req.body.name,
    technology: req.body.technology,
    colors: req.body.colors,
    pricePerGram: req.body.pricePerGram,
    applicationTypes: req.body.applicationTypes,
    imageUrl: req.file ? req.file.path : ''
  });

  try {
    const newMaterial = await material.save();
    res.status(201).json(newMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });

    if (req.body.name) material.name = req.body.name;
    if (req.body.technology) material.technology = req.body.technology;
    if (req.body.colors) material.colors = req.body.colors;
    if (req.body.pricePerGram) material.pricePerGram = req.body.pricePerGram;
    if (req.body.applicationTypes) material.applicationTypes = req.body.applicationTypes;
    if (req.file) {
      if (material.imageUrl) fs.unlinkSync(path.resolve(material.imageUrl));
      material.imageUrl = req.file.path;
    }

    const updatedMaterial = await material.save();
    res.json(updatedMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a material by ID
exports.deleteMaterial = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ message: 'Material not found' });
        }
        await Material.findByIdAndDelete(req.params.id); // Change to findByIdAndDelete
        res.json({ message: 'Material deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
