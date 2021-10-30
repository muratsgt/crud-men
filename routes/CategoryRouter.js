const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

/**
 * @route   /api/category
 * @access  private
 */

router.get("/get/:id", CategoryController.getCategory);

router.get("/", CategoryController.getAllCategories);

router.post("/add", CategoryController.addCategory);

router.post("/update", CategoryController.updateCategory);

router.get("/delete/:id", CategoryController.deleteCategory);


module.exports = router;