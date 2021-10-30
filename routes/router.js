const express = require('express');
const router = express.Router();
const CategoryRouter = require('./CategoryRouter');
const ProductRouter = require('./ProductRouter');

/** 
 * @route   api/category
 * @desc    Route for categories
 */
router.use("/category", CategoryRouter);

/** 
 * @route   api/product
 * @desc    Route for products
 */
router.use("/product", ProductRouter);


module.exports = router;