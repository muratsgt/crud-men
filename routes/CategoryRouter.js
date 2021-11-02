const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { categoryValidation } = require('../middleware/validationMiddleware');

/**
 * @route   /api/category
 * @access  private
 */

router.get("/get/:id", CategoryController.getCategory);

router.get("/", CategoryController.getAllCategories);

router.post("/add", categoryValidation, CategoryController.addCategory);

router.post("/update", categoryValidation, CategoryController.updateCategory);

router.get("/delete/:id", CategoryController.deleteCategory);

router.get("/destroy/:id", CategoryController.destroyCategory);


module.exports = router;