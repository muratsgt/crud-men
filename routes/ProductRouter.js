const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

/**
 * @route api/product
 * @access  private
 */

router.get("/", ProductController.getAllProducts);

router.get("/get/:id", ProductController.getProduct);

router.post("/add", ProductController.addProduct);

router.post("/update", ProductController.updateProduct);

router.get("/delete/:id", ProductController.deleteProduct);


module.exports = router;