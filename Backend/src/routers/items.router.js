const express = require('express');
const Item = require('../models/items.model'); // Ensure path is correct

const router = express.Router();

// GET all items grouped by category
router.get('/unique-categories', async (req, res) => { 
  try {
    // Get distinct category values from the "category" field of all items
    const uniqueCategories = await Item.distinct('category');
    
    res.status(200).json({
      success: true,
      data: uniqueCategories, // Return unique categories
    });
  } catch (error) {
    console.error('Error fetching unique categories:', error);
    res.status(500).json({ success: false, message: 'Error fetching unique categories' });
  }
});

router.get('/', async (req, res) => {
  try {
    const itemsByCategory = await Item.aggregate([
      { $group: { _id: "$category", items: { $push: "$$ROOT" } } },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({ success: true, data: itemsByCategory });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ success: false, message: 'Error fetching items' });
  }
});

// POST a new item
router.post('/', async (req, res) => {
  try {
    const { name, image, description, category, price } = req.body;

    if (!name || !category || !price || !description || !image) {
      return res.status(400).json({ success: false, message: "Please provide name, category, price, description, and image" });
    }

    const newItem = new Item({ name, image, description, category, price });
    await newItem.save();

    res.status(201).json({ success: true, message: "Item added successfully", data: newItem });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ success: false, message: 'Error adding item' });
  }
});

// PUT update an item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, category, price } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(id, { name, image, description, category, price }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, message: "Item updated successfully", data: updatedItem });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ success: false, message: 'Error updating item' });
  }
});

// DELETE an item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findById(id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    await deletedItem.remove();

    res.status(200).json({ success: true, message: "Item deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ success: false, message: 'Error deleting item' });
  }
});

// GET a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const selectedItem = await Item.findById(id);

    if (!selectedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, message: "Item found", data: selectedItem });
  } catch (error) {
    console.error("Error finding item:", error);
    res.status(500).json({ success: false, message: "Error finding item" });
  }
});



module.exports = router;
