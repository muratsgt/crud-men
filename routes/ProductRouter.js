const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { productValidation } = require('../middleware/validationMiddleware');

/**
 * @route api/product
 * @access  private
 */

router.get("/", ProductController.getAllProducts);

router.get("/get/:id", ProductController.getProduct);

router.post("/add", productValidation, ProductController.addProduct);

router.post("/update", productValidation, ProductController.updateProduct);

router.get("/delete/:id", ProductController.deleteProduct);


module.exports = router;