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
        const product = await Product.findById(req.params.id).populate("category");
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ errors: error });
    };
}


exports.addProduct = async (req, res) => {
    try {
        const { title, description, imageUrl,
            unitPrice, quantity, category, status } = req.body;

        // validation
        const validationRes = validator.validationResult(req);
        if (validationRes.errors.length > 0) {
            return res.status(400).json(validationRes);
        };

        // save to DB
        const product = new Product({
            title, description, imageUrl,
            unitPrice, quantity, category, status
        });
        try {
            const savedProduct = await product.save({ new: true });
            console.log("ProductController.js ~ line 43 ~ savedProduct: ", savedProduct);
        } catch (error) {
            return res.status(500).json(error);
        }

        res.send("Successfully saved to DB");

    } catch (error) {
        return res.status(500).json(error);
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const { title, description, imageUrl,
            unitPrice, quantity, category, status, _id } = req.body;

        // validation
        validationRes = validator.validationResult(req);
        if (validationRes.errors.length > 0) {
            return res.status(400).json(validationRes);
        };

        // find and update
        const updatedProd = await Product.findByIdAndUpdate(_id, {
            title, description, imageUrl,
            unitPrice, quantity, category, status: status || "updated"
        }, { new: true, runValidators: true });
        console.log("ProductController.js ~ line 71 ~ updatedProd", updatedProd);

        res.status(200).send("Successfully updated");

    } catch (error) {
        return res.status(500).json(error);
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            status: "deleted"
        });
        res.status(200).send(`Product id:${req.params.id} deleted`)
    } catch (error) {
        return res.status(500).json({ errors: error })
    };
}


exports.destroyProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(`Product id:${req.params.id} deleted from DB`)
    } catch (error) {
        return res.status(500).json({ errors: error })
    };
}
