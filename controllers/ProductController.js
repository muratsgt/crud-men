const Product = require('../models/Product');
const validator = require("express-validator");


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ errors: error });
    };
}


exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ errors: error });
    };
}


exports.addProduct = async (req, res) => {
    const { title, description, imageUrl,
        unitPrice, quantity, category, status } = req.body;

    // validation
    const validationRes = validator.validationResult(req);
    if (validationRes.errors.length > 0) {
        res.status(400).json(validationRes);
    };

    res.send("success");



}


exports.updateProduct = async (req, res) => {

}


exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(`Product id:${req.params.id} deleted`)
    } catch (error) {
        return res.status(500).json({ errors: error })
    };
}



